import type { ConfigContext, ExpoConfig } from 'expo/config';

// Mapbox requires a public access token (used at runtime to load map styles/tiles)
// and a secret downloads token (used only during the native build to pull the SDK
// from Mapbox's private Maven/CocoaPods registry). Both are read from the
// environment so real secrets never live in source control. See .env.example.
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN ?? '';
const MAPBOX_DOWNLOAD_TOKEN = process.env.MAPBOX_DOWNLOAD_TOKEN ?? '';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Mapifind',
  slug: 'mapifind',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'mapifind',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mapifind.app',
  },
  android: {
    package: 'com.mapifind.app',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsImpl: 'mapbox',
        RNMapboxMapsDownloadToken: MAPBOX_DOWNLOAD_TOKEN,
      },
    ],
    'expo-sqlite',
    'expo-notifications',
    'expo-task-manager',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow Mapifind to use your location to record paths and detect zones.',
      },
    ],
  ],
  extra: {
    // Exposed to the app via `expo-constants` (Constants.expoConfig?.extra).
    mapboxAccessToken: MAPBOX_ACCESS_TOKEN,
  },
});
