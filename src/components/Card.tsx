import { Theme } from '~/theme';

import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';

import Box from './Box';

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;
export const Card = createRestyleComponent<Props, Theme>([spacing, createVariant({ themeKey: 'cardVariants' })], Box);
