import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export interface ScreenContainerProps extends PropsWithChildren {
  scroll?: boolean;
  style?: ViewStyle;
}

/**
 * Standard themed screen wrapper: safe-area aware, padded, with a consistent
 * background. Use for every top-level screen unless it needs an edge-to-edge
 * layout (e.g. the full-bleed map screen).
 */
export function ScreenContainer({ children, scroll = false, style }: ScreenContainerProps) {
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Wrapper
        style={[styles.content, style]}
        contentContainerStyle={scroll ? styles.scrollContent : undefined}
      >
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
});

export default ScreenContainer;
