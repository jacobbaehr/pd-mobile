import { PopoverProps } from '~/screens/pool/components/PoolPopover';

export const createPoolPopoverProps: PopoverProps = {
    name: {
        id: 'name',
        title: 'Create Pool Name',
        description: 'Choose a name that best describes your pool',
    },
    waterType: {
        id: 'waterType',
        title: 'Create Water Type',
        description: 'Select your pool\'s sanitization method',
    },
    gallons: {
        id: 'gallons',
        title: 'Create Pool Volume',
        description: 'Don\'t know your pool\'s volume? Tap "Use Volume Estimator" below.',
    },
    wallType: {
        id: 'wallType',
        title: 'Create Wall Type',
        description: 'This choice might affect the target range for some of your chemical readings',
    },
    recipe: {
        id: 'recipe',
    },
};
