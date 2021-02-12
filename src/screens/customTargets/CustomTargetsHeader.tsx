import * as React from 'react';
import { BackButton } from '~/components/buttons/BackButton';
import { PDBox } from '~/components/PDBox';
import { PDText } from '~/components/PDText';

import { useNavigation } from '@react-navigation/native';

const CustomTargetsHeader: React.FC = () => {
    const { goBack } = useNavigation();

    const handlePressedBack = () => {
        goBack();
    };

    return (
        <PDBox
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            px="md"
            backgroundColor="white"
            borderBottomColor="greyLighter"
            borderBottomWidth={2}
            pb="sm">
            <BackButton title="" onPress={handlePressedBack} scale={{ scale: true, scaleLines: 2 }} />
            <PDBox>
                <PDText variant="heading" color="black">
                    Custom Targets
                </PDText>
            </PDBox>
            <PDBox />
        </PDBox>
    );
};

export default CustomTargetsHeader;
