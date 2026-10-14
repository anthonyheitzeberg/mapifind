import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, ScreenContainer, Card } from '../../components';
import { colors, spacing, typography } from '../../theme';
import type { AuthStackScreenProps } from '../../navigation/types';

export function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  return (
    <ScreenContainer title="Create your account">
      <Text style={styles.subtitle}>Track paths, label zones, and sync across devices.</Text>

      <Card style={styles.card}>
        <Text style={styles.placeholder}>Sign-up form will live here (Phase 2).</Text>
        <Button title="Sign up" onPress={() => undefined} style={styles.button} />
        <Button
          title="Back to log in"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  card: {
    gap: spacing.sm,
  },
  placeholder: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.sm,
  },
});

export default SignUpScreen;
