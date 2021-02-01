import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BackButton } from '~/components/buttons/BackButton';
import { Button } from '~/components/buttons/Button';

interface EditListHeaderProps {
    handleBackPress: () => void;
    buttonText: string;
    rightButtonAction: (() => Promise<void>) | null;
}

export class EditListHeader extends React.Component<EditListHeaderProps, {}> {
    render() {
        const rightButton =
            this.props.rightButtonAction !== undefined ? (
                <View>
                    <Button
                        title={'Delete'}
                        onPress={() => this.props.rightButtonAction && this.props.rightButtonAction()}
                        styles={styles.deleteButton}
                        textStyles={styles.deleteButtonText}
                    />
                </View>
            ) : null;
        return (
            <View style={styles.container}>
                <View style={styles.options}>
                    <View style={{ width: '50%' }}>
                        <BackButton
                            title={this.props.buttonText ? this.props.buttonText : 'Create'}
                            onPress={this.props.handleBackPress}
                            scale={{ scale: true, scaleLines: 2 }}
                        />
                    </View>
                    {rightButton}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    options: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3,
    },
    deleteButton: {
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
        marginTop: 5,
    },
    deleteButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
});
