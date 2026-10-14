import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../theme';

export interface StatBlockProps {
  /** Big heavyweight number/value, e.g. "4.2", "32:10". */
  value: string;
  /** Small muted caption beneath the value, e.g. "miles", "duration". */
  label: string;
  style?: ViewStyle;
}

/**
 * Apple Health style "big number, small label" stat display — used for
 * distance / duration / pace once path recording & history ship.
 */
export function StatBlock({ value, label, style }: StatBlockProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  value: {
    fontSize: typography.sizes.stat,
    fontWeight: typography.weights.heavy,
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    letterSpacing: typography.letterSpacing.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

export default StatBlock;
