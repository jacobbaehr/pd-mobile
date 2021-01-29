import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { PDText } from '~/components/PDText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoringButton } from '~/components/buttons/BoringButton';
import { images } from '~/assets/images';
import { useNavigation } from '@react-navigation/native';
import { PDNavigationProps } from '~/navigator/Navigators';

/**
 * Displays info about the recipe & customizations in the SectionList on the pool details screen.
 */
const PoolServiceConfigSection = () => {
    const { navigate } = useNavigation<PDNavigationProps>();
    const isEmptyCustom = false;

    const navigateToCustomTargets = () => {
        navigate('CustomTargets');
    };

    const getCustomTargets = (values = ['Chlorine', 'Alkalinity', 'hi']) => {
        const lastItem = values.length - 1;
        return values.reduce((acm, value, i) => {
            if (i === lastItem) {
                acm += `and ${value}`;
            } else if (i === 0) {
                acm += `${value}`;
            } else {
                acm += `, ${value} `;
            }
            return acm;
        }, '');
    };

    return (
        <View style={styles.container}>
            <View>
                <PDText style={styles.title}>Configuration Service</PDText>
                <View>
                    <View>
                        <PDText style={styles.subTitle}>Recipe</PDText>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.row}>
                                <Text style={styles.buttonResults} numberOfLines={1} ellipsizeMode="tail">
                                    Default Recipe
                                </Text>
                                <Image source={images.rightArrow} height={21} width={22} style={styles.arrowImage} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isEmptyCustom || (
                        <View>
                            <PDText style={styles.subTitle}>Custom Targets</PDText>
                            <TouchableOpacity onPress={navigateToCustomTargets}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonResults} numberOfLines={1} ellipsizeMode="tail">
                                        {getCustomTargets()}
                                    </Text>
                                    <Image
                                        source={images.rightArrow}
                                        height={21}
                                        width={22}
                                        style={styles.arrowImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <BoringButton title="Start Service" onPress={() => {}} containerStyles={styles.buttonContainer} />
            <PDText style={styles.lastUpdateText}>Last Serviced 20 days ago</PDText>
        </View>
    );
};

const border = {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 2,
};

const styles = StyleSheet.create({
    container: {
        ...border,
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    navRow: {
        flexDirection: 'row',
    },
    poolVolumeText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 18,
        fontWeight: '600',
    },
    editButtonContainer: {
        alignSelf: 'center',
    },
    backButtonContainer: {
        flexGrow: 1,
    },
    editButton: {
        backgroundColor: 'rgba(30,107,255,.1)',
        borderRadius: 15,
    },
    editButtonText: {
        color: '#2D5FFF',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
    recipeLinkNormal: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        backgroundColor: '#00B25C',
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    arrowImage: {
        alignSelf: 'center',
        marginLeft: 8,
    },
    buttonResults: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1E6BFF',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 27,
        color: '#000',
        marginBottom: 12,
    },
    subTitle: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 27,
        color: '#8C8C8C',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.8,
    },

    lastUpdateText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#8C8C8C',
        marginBottom: 18,
    },
});

export default PoolServiceConfigSection;
