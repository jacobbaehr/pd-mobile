import React, { useContext, useState } from 'react';
import { EnumPoolUnit, PoolUnit } from '~/models/Pool/PoolUnit';

import {
    AllShapes, CircleMeasurements, OtherMeasurements, OvalMeasurements, RectangleMeasurements,
    ShapeId
} from '../screens/volumeEstimator/VolumeEstimatorHelpers';

interface EntryShape {
    rectangle: RectangleMeasurements;
    circle: CircleMeasurements;
    other: OtherMeasurements;
    oval: OvalMeasurements;
    estimation: string;
    unit: PoolUnit;
}

type ShapeDispatchType = React.Dispatch<React.SetStateAction<EntryShape>>;

const initialState: EntryShape = {
    rectangle: {
        deepest: '',
        shallowest: '',
        length: '',
        width: '',
    },
    oval: {
        deepest: '',
        shallowest: '',
        length: '',
        width: '',
    },
    circle: {
        deepest: '',
        shallowest: '',
        diameter: '',
    },
    other: {
        deepest: '',
        shallowest: '',
        area: '',
    },
    estimation: '',
    unit: EnumPoolUnit.us,
};

const ShapeState = React.createContext<EntryShape>(initialState);
const ShapeDispatch = React.createContext<ShapeDispatchType>(() => {});

export const ShapeProvider: React.FC = ({ children }) => {
    const [shape, setShape] = useState<EntryShape>(initialState);

    return (
        <ShapeState.Provider value={ shape }>
            <ShapeDispatch.Provider value={ setShape }>{children}</ShapeDispatch.Provider>
        </ShapeState.Provider>
    );
};

export const useVolumeEstimator = (shapeId: ShapeId) => {
    const shape = useContext(ShapeState);
    const dispatch = useContext(ShapeDispatch);

    const setShape = (values: Partial<AllShapes>) => {
        dispatch((prev) => ({ ...prev, [shapeId]: { ...prev[shapeId], ...values } }));
    };

    const setEstimation = (value: string) => {
        dispatch({ ...shape, estimation: value });
    };

    const setUnit = (value: PoolUnit) => {
        dispatch({ ...shape, unit: value });
    };

    const clear = () => {
        dispatch({ ...initialState });
    };

    return {
        shape: shape[shapeId],
        setShape,
        setEstimation,
        estimation: shape.estimation,
        clear,
        unit: shape.unit,
        setUnit,
    };
};
