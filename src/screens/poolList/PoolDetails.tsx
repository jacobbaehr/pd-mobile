import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import { SafeAreaView } from 'react-navigation';

import { GradientButton } from 'components/buttons/GradientButton';
import { PDText } from 'components/PDText';
import { Pool } from 'models/Pool';

import { EditListHeader } from './PoolDetailsHeader';
import { TextInputWithTitle } from 'components/TextInputWithTitle';

interface PoolDetailProps {
    header: string;
    name: string;
    type: string;
    volume: number;
    originalPoolName: string;
    pool?: Pool;
    updateText(t:string,s:string): void;
    goBack(): void;
    rightButtonAction?: ()=>void;
    navigation: any;
    handleSavePoolPressed: ()=>void;
}

const waterTypes = [{value: 'Salt Water'}, {value:'Chlorine'}];

export  class PoolDetails extends React.Component<PoolDetailProps, {}> {

    // Extracts section header from section list object
    renderHeader = (passedHeader:any) => {
        return <PDText style={styles.sectionHeader}>{passedHeader.section.title}</PDText>;
    }

    render() {
        const { header, originalPoolName, goBack, rightButtonAction } = this.props;
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <View>
                        <EditListHeader
                            handleBackPress={ ()=>goBack() }
                            header={header}
                            buttonText={originalPoolName}
                            rightButtonAction={ rightButtonAction } />
                        <PDText style={styles.sectionHeader}>Basic Information</PDText>
                        
                        <View style={styles.listContainer}>
                            <TextInputWithTitle
                                titleText='Name'
                                onTextChanged={(s) => this.props.updateText(s, 'name')}
                                titleTextStyles={styles.poolNameLabel}
                                inputStyles={styles.textInput}
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                keyboardType='default'
                                value={this.props.name}
                            />
                        </View>
                        <View style={styles.listContainer}>
                            <PDText style={styles.waterTypeLabel}>Water Type</PDText>
                            <Dropdown
                                data={waterTypes}
                                value={this.props.type}
                                textColor={'#1E6BFF'}
                                itemTextStyle={{
                                    color: '#1E6BFF',
                                    fontWeight: '500',
                                    fontSize: 22}}
                                fontSize={22}
                                onChangeText={(t:string)=>this.props.updateText(t, 'type')}>
                            </Dropdown>
                        </View>
                        <View style={styles.listContainer}>
                            <TextInputWithTitle
                                titleText='Volume'
                                subtitleText='(Gallons)'
                                onTextChanged={(s) => this.props.updateText(s, 'volume')}
                                titleTextStyles={styles.poolNameLabel}
                                subtitleTextStyles={styles.poolNameSubLabel}
                                inputStyles={styles.textInput}
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                keyboardType='default'
                                value={`${this.props.volume}`}
                            />
                        </View>
                        <GradientButton
                            onPress={()=>this.props.handleSavePoolPressed()}
                            title={'Save'}
                            containerStyles={styles.startServiceButton} />
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
    waterTypeLabel: {
        justifyContent: 'center',
        color: '#000000',
        fontWeight: '600',
        fontSize: 22,
        marginBottom: -20
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
