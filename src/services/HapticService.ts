import ReactNativeHapticFeedback from "react-native-haptic-feedback";

export class Haptic {

    private static options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    };

    static selection = () => {
        ReactNativeHapticFeedback.trigger("selection", Haptic.options);
    }
    static light = () => {
        ReactNativeHapticFeedback.trigger("impactLight", Haptic.options);
    }
    static medium = () => {
        ReactNativeHapticFeedback.trigger("impactMedium", Haptic.options);
    }
    static heavy = () => {
        ReactNativeHapticFeedback.trigger("impactHeavy", Haptic.options);
    }
}