export const myCustomTransitionFunction = (transitionInfo: any) => {
    const { progress, start, end } = transitionInfo;
    const scaleInterpolation = progress.interpolate({
        inputRange: [0, start, end, 1],
        outputRange: [88, 80, 1, 1],
    });
    return { transform: [{ scale: scaleInterpolation }] };
};
