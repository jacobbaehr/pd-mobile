import { Color } from 'csstype';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BackButton } from 'components/buttons/BackButton';
import { Button } from 'components/buttons/Button';
import { PDGradientText } from 'components/PDGradientText';

interface EditListHeaderProps {
    handleBackPress: () => void;
    buttonText: string;
    actions: () => void;
    header: string;
}

export class EditListHeader extends React.Component<EditListHeaderProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.options}>
                    <View style={{width:'50%'}}>
                        <BackButton
                            title={this.props.buttonText ? this.props.buttonText: 'Back'}
                            handleBackPressed={this.props.handleBackPress}
                            scale={{scale:true, scaleLines:2}}
                        />
                    </View>
                    <Button title={'Save'} onPress={()=>this.props.actions()} styles={styles.button} textStyles={styles.buttonText}/>
                </View>
                <PDGradientText style={styles.gradientText} colors={gradientColors}>
                    {this.props.header}
                </PDGradientText>
            </View>
        );
    }
}

const gradientColors: Color[] = ['#FCCB90', '#D57EEB'];

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    options: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    button: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 10.4,
        alignSelf: 'flex-end',
        top: -10,
        height: 21,
        width: 52
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 13.2,
        fontWeight: '600',
    }
});