import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

export interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
}

/** Asana-style grouped card: soft rounded corners, subtle shadow, no hard border. */
export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: spacing.md,
    ...shadows.card,
  },
});

export default Card;
