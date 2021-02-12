import React from 'react';
import { Theme } from '~/theme';

import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';

import { PDBox } from './PDBox';

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof PDBox>;

export const Card = createRestyleComponent<Props, Theme>([spacing, createVariant({ themeKey: 'cardVariants' })], PDBox);
