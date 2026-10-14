import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card, SectionHeader, StatBlock } from '../../components';
import { colors, spacing, typography } from '../../theme';

export function PathsScreen() {
  return (
    <ScreenContainer scroll title="Paths">
      <SectionHeader title="This week" />
      <Card style={styles.statsCard}>
        <StatBlock value="0.0" label="miles" />
        <StatBlock value="0" label="paths" />
        <StatBlock value="--" label="avg pace" />
      </Card>

      <SectionHeader title="Recent paths" style={styles.sectionSpacing} />
      <Card>
        <Text style={styles.body}>
          Your recorded paths will be listed here, with replay and export options.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionSpacing: {
    marginTop: spacing.lg,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
});

export default PathsScreen;
