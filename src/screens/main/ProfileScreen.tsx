import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, Card, Button } from '../../components';
import { colors, spacing, typography } from '../../theme';
import { isSupabaseConfigured } from '../../lib/supabase';

export function ProfileScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>
      <Card style={styles.card}>
        <Text style={styles.body}>
          Account details, sync status, and app settings will live here.
        </Text>
        <Text style={styles.status}>
          Supabase: {isSupabaseConfigured ? 'configured' : 'not configured (see .env.example)'}
        </Text>
        <Button title="Log out" variant="outline" onPress={() => undefined} style={styles.button} />
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
  card: {
    gap: spacing.sm,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  status: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  button: {
    marginTop: spacing.sm,
  },
});

export default ProfileScreen;
