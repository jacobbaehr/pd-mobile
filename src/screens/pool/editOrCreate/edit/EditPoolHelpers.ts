import { PopoverProps } from '~/screens/pool/components/PoolPopover';

interface EditPoolPopoverProps extends PopoverProps {
    customTargets: {
        id: 'customTargets',
    },
    importData: {
        id: 'importData',
    },
    deletePool: {
        id: 'deletePool',
    },
}

export const editPoolPopoverProps: EditPoolPopoverProps = {
    name: {
        id: 'name',
        title: 'Pool Name',
        description: 'Choose a name that best describes your pool',
    },
    waterType: {
        id: 'waterType',
        title: 'Water Type',
        description: 'Select your pool\'s sanitization method',
    },
    gallons: {
        id: 'gallons',
        title: 'Pool Volume',
        description: 'Don\'t know your pool\'s volume? Tap "Use Volume Estimator" below.',
    },
    wallType: {
        id: 'wallType',
        title: 'Wall Type',
        description: 'This choice might affect the target range for some of your chemical readings',
    },
    recipe: {
        id: 'recipe',
    },
    customTargets: {
        id: 'customTargets',
    },
    importData: {
        id: 'importData',
    },
    deletePool: {
        id: 'deletePool',
    },
};
