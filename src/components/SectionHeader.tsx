import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../theme';

export interface SectionHeaderProps {
  title: string;
  style?: ViewStyle;
}

/**
 * Small muted, letter-spaced, uppercase label used above grouped content —
 * the Asana-style section label (e.g. "RECENT PATHS", "YOUR ZONES").
 */
export function SectionHeader({ title, style }: SectionHeaderProps) {
  return <Text style={[styles.label, style]}>{title.toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    letterSpacing: typography.letterSpacing.sectionHeader,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});

export default SectionHeader;
