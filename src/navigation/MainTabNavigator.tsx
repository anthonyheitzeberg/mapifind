import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/main/MapScreen';
import { PathsScreen } from '../screens/main/PathsScreen';
import { ZonesScreen } from '../screens/main/ZonesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { colors, typography } from '../theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple text glyphs for now; swap for a proper icon set (e.g. @expo/vector-icons)
// once the design system grows beyond Phase 1.
const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Map: '🗺️',
  Paths: '👣',
  Zones: '📍',
  Profile: '👤',
};

function TabIcon({ route, color }: { route: keyof MainTabParamList; color: string }) {
  return <Text style={[styles.icon, { color }]}>{TAB_ICONS[route]}</Text>;
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary700 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '600' },
        tabBarActiveTintColor: colors.primary700,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: typography.sizes.xs },
        tabBarIcon: ({ color }) => (
          <TabIcon route={route.name as keyof MainTabParamList} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Paths" component={PathsScreen} />
      <Tab.Screen name="Zones" component={ZonesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: typography.sizes.lg,
  },
});

export default MainTabNavigator;
