import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card } from '../../components';
import { colors, spacing, typography } from '../../theme';

export function PathsScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Paths</Text>
      <Card>
        <Text style={styles.body}>
          Your recorded paths will be listed here, with replay and export options.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary800,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
});

export default PathsScreen;
