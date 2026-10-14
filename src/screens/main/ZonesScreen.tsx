import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card, SectionHeader } from '../../components';
import { colors, typography } from '../../theme';

export function ZonesScreen() {
  return (
    <ScreenContainer scroll title="Zones">
      <SectionHeader title="Your zones" />
      <Card>
        <Text style={styles.body}>
          Your custom labeled geofence zones (e.g. &quot;Zone 12&quot;) will be managed here.
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

export default ZonesScreen;
