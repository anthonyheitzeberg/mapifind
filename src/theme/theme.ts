/**
 * Shared design tokens for Mapifind: a green-shades + white theme intended to
 * read as "outdoorsy / trail-ready" for hikers, farmers, and tourism use cases.
 */

export const colors = {
  // Primary green scale (brand)
  primary50: '#E8F5E9',
  primary100: '#C8E6C9',
  primary200: '#A5D6A7',
  primary300: '#81C784',
  primary400: '#66BB6A',
  primary500: '#4CAF50',
  primary600: '#43A047',
  primary700: '#2E7D32',
  primary800: '#1B5E20',
  primary900: '#103A12',

  // Accent (used sparingly for highlights, active zone markers, etc.)
  accent: '#8BC34A',
  accentDark: '#689F38',

  // Neutrals
  white: '#FFFFFF',
  backgroundLight: '#F7FBF7',
  backgroundAlt: '#EEF5EE',
  border: '#D7E6D8',

  // Text
  textPrimary: '#14301A',
  textSecondary: '#4B6652',
  textInverse: '#FFFFFF',
  textMuted: '#8AA091',

  // Semantic
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
  info: '#0277BD',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  fontFamily: undefined, // use platform default; swap in a custom font later
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;

export type Theme = typeof theme;

export default theme;
