import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card } from '../../components';
import { colors, typography } from '../../theme';

export function MapScreen() {
  return (
    <ScreenContainer title="Map">
      <Card>
        <Text style={styles.body}>
          The live Mapbox map, path recording controls, and zone overlays will appear here.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
});

export default MapScreen;
