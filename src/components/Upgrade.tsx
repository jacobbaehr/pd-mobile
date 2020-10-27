import React from "react";
import { View, Image, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { PDText } from "./PDText";
import { images } from "~/assets/images";
import { BoringButton } from "./buttons/BoringButton";
import { Conditional } from "./Conditional";

interface UpgradeProps {
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    isUnlocked: boolean;        // Whether the user has upgraded to the pro version
}

export const Upgrade: React.FunctionComponent<UpgradeProps> = (props) => {
    return (
        <View style={ [styles.plusContainer, props.style] }>
            <View style={ { flexDirection: 'row', display: 'flex' } }>
                <View style={ { flex: 1 } }></View>
                <Image style={ styles.pdProImageStyles } source={ images.logoGreenPlus } width={ 3000 } resizeMode={ 'contain' } />
                <View style={ { flex: 1 } }></View>
            </View>
            <Conditional condition={ !props.isUnlocked }>
                <View style={ styles.textContainer }>
                    <Text style={ styles.onlineBackupText }>• Charts</Text>
                    <Text style={ styles.onlineBackupText }>• Unlimited Pools</Text>
                    <Text style={ styles.onlineBackupText }>• Less than $2 / month</Text>
                </View>
            </Conditional>
            <BoringButton
                title={ props.isUnlocked ? 'Manage' : 'Unlock' }
                onPress={ props.onPress }
                containerStyles={ styles.plusButton }
                textStyles={ styles.plusButtonText }
            />
        </View>);
}

const styles = StyleSheet.create({
    plusContainer: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#00C89F',
        padding: 15,
        alignItems: 'center'
    },
    pdProImageStyles: {
        margin: 10,
        marginVertical: 12,
        flex: 4
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 12,
        paddingTop: 6,
        flex: 1
    },
    onlineBackupText: {
        flex: 1,
        color: '#666',      // <-- The devil's color
        fontWeight: '400',
        fontSize: 20,
        marginBottom: 4
    },
    plusButton: {
        backgroundColor: '#00C89F',
        borderRadius: 25,
        shadowColor: 'transparent',
        paddingHorizontal: 12,
        marginBottom: 12,
        marginTop: 16,
        alignSelf: 'stretch'
    },
    plusButtonText: {
        color: 'white'
    },
});
