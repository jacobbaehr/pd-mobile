import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import { SafeAreaView } from 'react-navigation';

import { GradientButton } from 'components/buttons/GradientButton';
import { PDText } from 'components/PDText';
import { Pool } from 'models/Pool';
import { selectPool } from 'redux/selectedPool/Actions';
import { dispatch } from 'redux/AppState';
import { Database } from 'repository/Database';

import { EditListHeader } from './PoolDetailsHeader';

interface PoolDetailProps {
    header: string;
    name: string;
    type: string;
    volume: number;
    selectedPool: string;
    data: DataArr[];
    pool?: Pool;
    updateText(t:string,s:string): void;
    goBack(): void;
    buttonAction(): void;
    navigation: any;
}

export interface DataArr {
    label: string;
    subLabel?: string;
    stateName: string;
    value: string;
    inputType: 'input' | 'select';
    data?: any;
}

export  class PoolDetails extends React.Component<PoolDetailProps, {}> {
    renderItems = (passedItem: any) => {
        const { updateText } = this.props;
        return (
            <View style={styles.listContainer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <PDText style={styles.poolNameLabel}>{passedItem.item.label}</PDText>
                    <PDText style={styles.poolNameSubLabel}>{passedItem.item.subLabel}</PDText>
                </View>
                <TextInput
                    style={styles.textInput}
                    value={String(passedItem.item.value)}
                    onChangeText={(t:string)=>updateText(t, passedItem.item.state)}
                    keyboardType={'default'} />
            </View>
        );
    }

    renderFields = (objArr: DataArr[]) => {
        return objArr.map((i:any,k:any) => {
            switch (i.inputType) {
                case 'input':
                    return (
                            <View style={styles.listContainer} key={k}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <PDText style={styles.poolNameLabel}>{i.label}</PDText>
                                    <PDText style={styles.poolNameSubLabel}>{i.subLabel}</PDText>
                                </View>
                                {this.renderTextInput(i)}
                            </View>
                    );
                case 'select':
                    return (
                        <View style={styles.listContainer} key={k}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <PDText style={styles.poolNameLabel}>{i.label}</PDText>
                                <PDText style={styles.poolNameSubLabel}>{i.subLabel}</PDText>
                            </View>
                            {this.renderSelector(i)}
                        </View>
                    );
            }
        });
    }

    handleDeletePoolSelected = async (pool: any) => {
        dispatch(selectPool());
        await Database.deletePool(pool);
        this.props.navigation.navigate('PoolList');
    }

    renderSelector = (obj :DataArr) => {
        const { updateText } = this.props;
        return (
            <Dropdown
                data={obj.data}
                value={obj.value}
                textColor={'#1E6BFF'}
                itemTextStyle={{
                    color: '#1E6BFF',
                    fontWeight: '500',
                    fontSize: 22}}
                fontSize={22}
                dropdownOffset={{top: 0, left: 0}}
                onChangeText={(t:string)=>updateText(t, obj.stateName)}>
            </Dropdown>
        );
    }

    renderTextInput = (obj:DataArr) => {
        const { updateText } = this.props;
        return (
            <TextInput
                style={styles.textInput}
                onChangeText={(t:string)=>updateText(t, obj.stateName)}
                value={String(obj.value)} />
        );
    }

    // Extracts section header from section list object
    renderHeader = (passedHeader:any) => {
        return <PDText style={styles.sectionHeader}>{passedHeader.section.title}</PDText>;
    }

    render() {
        const { header, selectedPool, goBack, buttonAction, data } = this.props;
        const deletePoolButton = this.props.pool ?
            (
                <GradientButton
                    onPress={()=>this.handleDeletePoolSelected(this.props.pool)}
                    title={'Delete Pool'}
                    containerStyles={styles.startServiceButton} />
            ) : null;
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAwareScrollView>
                    <View>
                        <EditListHeader
                            handleBackPress={ ()=>goBack() }
                            header={header}
                            buttonText={selectedPool}
                            actions={ ()=>buttonAction() } />
                        <PDText style={styles.sectionHeader}>Basic Information</PDText>
                        {this.renderFields(data)}
                        { deletePoolButton }
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

  const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    listContainer: {
        paddingTop: 10,
        paddingHorizontal: 20
    },
    poolNameLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22
    },
    poolNameSubLabel: {
        justifyContent: 'center',
        color: '#1E6BFF',
        fontWeight: '600',
        fontSize: 22
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#D0D0D0',
        color: '#1E6BFF',
        fontWeight: '500',
        fontSize: 22
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    sectionHeader: {
        marginTop: 20,
        marginHorizontal: 15,
        fontWeight: '700',
        fontSize: 28
    },
    startServiceButton: {
        height: 67,
        paddingHorizontal: 6
    },
});
