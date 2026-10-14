import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card } from '../../components';
import { colors, spacing, typography } from '../../theme';

export function ZonesScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Zones</Text>
      <Card>
        <Text style={styles.body}>
          Your custom labeled geofence zones (e.g. &quot;Zone 12&quot;) will be managed here.
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

export default ZonesScreen;
