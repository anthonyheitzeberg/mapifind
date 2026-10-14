import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, ScreenContainer, Card } from '../../components';
import { colors, spacing, typography } from '../../theme';
import type { AuthStackScreenProps } from '../../navigation/types';

export function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Welcome to Mapifind</Text>
      <Text style={styles.subtitle}>Log in to sync your paths and zones.</Text>

      <Card style={styles.card}>
        <Text style={styles.placeholder}>Email / password sign-in will live here (Phase 2).</Text>
        <Button title="Log in" onPress={() => undefined} style={styles.button} />
        <Button
          title="Create an account"
          variant="outline"
          onPress={() => navigation.navigate('SignUp')}
          style={styles.button}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary800,
    marginBottom: spacing.xs,
  },
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

export default LoginScreen;
