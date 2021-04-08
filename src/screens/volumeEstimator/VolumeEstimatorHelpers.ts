import { PDTheme } from '~/components/PDTheme';
import { PoolUnit } from '~/models/Pool/PoolUnit';

export interface RectangleMeasurements {
    deepest: string;
    shallowest: string;
    length: string;
    width: string;
}

export interface OtherMeasurements {
    deepest: string;
    shallowest: string;
    area: string;
}

export interface CircleMeasurements {
    deepest: string;
    shallowest: string;
    diameter: string;
}

export interface OvalMeasurements {
    deepest: string;
    shallowest: string;
    length: string;
    width: string;
}

export interface BaseShapeEntry {
    unit: string;
}

export interface Shape {
    id: ShapeId;
    label: string;
    icon: string;
}

export type ShapeId = 'rectangle' | 'circle' | 'oval' | 'other';
export type AllShapes = RectangleMeasurements & CircleMeasurements & OtherMeasurements & OvalMeasurements;
export type Formula = (props: AllShapes) => number;

export const shapes: Shape[] = [
    {
        id: 'rectangle',
        label: 'Rectangle',
        icon: 'IconRectangle',
    },
    {
        id: 'circle',
        label: 'Circle',
        icon: 'IconCircle',
    },
    {
        id: 'oval',
        label: 'Oval',
        icon: 'IconOval',
    },
    {
        id: 'other',
        label: 'Other',
        icon: 'IconOther',
    },
];

export class VolumeEstimatorHelpers {
    static isCompletedField = (shape: Partial<AllShapes>) => Object.keys(shape).every((sp) => !!shape[sp]);

    static getBigShapeForSVG = (shapeId: ShapeId): string => {
        const bigShapeNamesById: Record<ShapeId, string> = {
            rectangle: 'Rectangle',
            circle: 'Circle',
            oval: 'Oval',
            other: 'Other',
        };
        return bigShapeNamesById[shapeId];
    };

    static getPrimaryColorByShapeId = (shapeId: ShapeId, theme: PDTheme): string => {
        const shapeByPrimaryColor: Record<ShapeId, string> = {
            rectangle: theme.blue,
            circle: theme.green,
            oval: theme.orange,
            other: theme.purple,
        };

        return shapeByPrimaryColor[shapeId];
    };

    static getPrimaryBlurredColorByShapeId = (shapeId: ShapeId, theme: PDTheme): string => {
        const shapeByPrimaryColor: Record<ShapeId, string> = {
            rectangle: theme.blurredBlue,
            circle: theme.blurredGreen,
            oval: theme.blurredOrange,
            other: theme.blurredPurple,
        };

        return shapeByPrimaryColor[shapeId];
    };

    static getFormulaByShapeId = (shapeId: ShapeId): Formula => {
        const rectangle = ({ width, length, deepest, shallowest }: RectangleMeasurements): number => {
            const area = +width * +length;
            const averageDeep = +deepest + +shallowest / 2;
            return area * averageDeep;
        };

        const oval = ({ deepest, shallowest, length, width }: OvalMeasurements): number => {
            const area = +width * +length;
            const averageDeep = +deepest + +shallowest / 2;
            return area * averageDeep;
        };

        const circle = ({ shallowest, deepest, diameter }: CircleMeasurements): number => {
            const averageDeep = +deepest + +shallowest / 2;
            const radius = +diameter / 2;
            return Math.PI * averageDeep * Math.pow(radius, 2);
        };

        const other = ({ area, deepest, shallowest }: OtherMeasurements): number => {
            const averageDeep = +deepest + +shallowest / 2;
            return 0.45 * +area * averageDeep;
        };

        const formulas: Record<ShapeId, Formula> = {
            rectangle,
            oval,
            circle,
            other,
        };

        return formulas[shapeId];
    };

    static getLabelForUnit = (unit: PoolUnit) : string => {
        const label : Record<PoolUnit, string> = {
            us: 'US',
            metric: 'Metric',
            imperial: 'Imperial',
        };
        return label[unit];
    }

    static getAbbreviationUnit = (unit: PoolUnit): string => {
        const abbreviation : Record<PoolUnit, string> = {
            us: 'FT',
            metric: 'M',
            imperial: 'FT',
        };
        return abbreviation[unit];
    }
}
