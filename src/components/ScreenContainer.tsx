import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

export interface ScreenContainerProps extends PropsWithChildren {
  scroll?: boolean;
  style?: ViewStyle;
  /** Renders an Apple Health-style oversized bold title above the content. */
  title?: string;
}

/**
 * Standard themed screen wrapper: safe-area aware, padded, with a consistent
 * background. Use for every top-level screen unless it needs an edge-to-edge
 * layout (e.g. the full-bleed map screen).
 */
export function ScreenContainer({ children, scroll = false, style, title }: ScreenContainerProps) {
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Wrapper
        style={[styles.content, style]}
        contentContainerStyle={scroll ? styles.scrollContent : undefined}
      >
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.heavy,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});

export default ScreenContainer;
