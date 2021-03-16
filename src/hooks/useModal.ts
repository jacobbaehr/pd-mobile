import { useState } from 'react';

export const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisible = () => {
        // turn on or turn off the visible.
        setVisible(!visible);
        console.log('visible: ', visible);
    };

    return { visible, toggleVisible };
};
