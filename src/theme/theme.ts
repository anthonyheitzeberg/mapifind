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
  xl: 22,
  pill: 999,
} as const;

/**
 * Typography follows two references the user likes:
 *  - Apple Health: the platform system font (San Francisco on iOS / Roboto on
 *    Android — RN's `'System'` already maps to the right one per-platform, so
 *    we lean on that instead of bundling a custom font), with a very bold
 *    oversized "large title" at the top of each screen and bold, heavyweight
 *    numerals for stats (distance/duration/pace), paired with small
 *    muted/letter-spaced captions underneath — the classic Health app
 *    "big number, small label" stat pattern.
 *  - Asana mobile: bold-but-friendly section headers in muted uppercase with
 *    letter spacing, generous whitespace, and card-based grouped lists.
 */
export const typography = {
  fontFamily: 'System', // San Francisco on iOS, Roboto on Android
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    // Apple Health style oversized page title (iOS "large title" scale)
    display: 34,
    // Apple Health style oversized stat numerals (e.g. "4.2 mi")
    stat: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  // Used for small muted section headers / stat captions, Asana/Health style.
  letterSpacing: {
    caption: 0.4,
    sectionHeader: 0.8,
  },
};

/** Soft, low-opacity card elevation shared by Card/StatBlock (Asana-style). */
export const shadows = {
  card: {
    shadowColor: colors.primary900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  raised: {
    shadowColor: colors.primary900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
} as const;

export type Theme = typeof theme;

export default theme;
