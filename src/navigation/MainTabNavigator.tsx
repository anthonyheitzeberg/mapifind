import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/main/MapScreen';
import { PathsScreen } from '../screens/main/PathsScreen';
import { ZonesScreen } from '../screens/main/ZonesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { colors } from '../theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple line-icon set (Asana/Health-style minimal tab bar) via @expo/vector-icons.
const TAB_ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Map: 'map-outline',
  Paths: 'walk-outline',
  Zones: 'location-outline',
  Profile: 'person-outline',
};

const TAB_ICONS_FOCUSED: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Map: 'map',
  Paths: 'walk',
  Zones: 'location',
  Profile: 'person',
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Asana/Health-style minimal header: plain white, no colored bar —
        // each screen renders its own bold large title in-content instead.
        headerShown: false,
        tabBarActiveTintColor: colors.primary700,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 58,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const name = route.name as keyof MainTabParamList;
          const icon = focused ? TAB_ICONS_FOCUSED[name] : TAB_ICONS[name];
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Paths" component={PathsScreen} />
      <Tab.Screen name="Zones" component={ZonesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
