import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card } from '../../components';
import { colors, spacing, typography } from '../../theme';

export function MapScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Map</Text>
      <Card>
        <Text style={styles.body}>
          The live Mapbox map, path recording controls, and zone overlays will appear here.
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

export default MapScreen;
