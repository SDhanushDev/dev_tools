class Environment {
  static const String _googleAdSenseClientId = String.fromEnvironment(
    'GOOGLE_ADSENSE_CLIENT_ID',
    defaultValue: '',
  );
  
  static const String _googleAdSenseBannerSlot = String.fromEnvironment(
    'GOOGLE_ADSENSE_SLOT_ID_BANNER',
    defaultValue: '',
  );
  
  static const String _googleAdSenseSidebarSlot = String.fromEnvironment(
    'GOOGLE_ADSENSE_SLOT_ID_SIDEBAR',
    defaultValue: '',
  );
  
  static const String _googleAnalyticsId = String.fromEnvironment(
    'GOOGLE_ANALYTICS_ID',
    defaultValue: '',
  );
  
  static const String _productionUrl = String.fromEnvironment(
    'PRODUCTION_URL',
    defaultValue: 'https://SDhanushDev.github.io/dev_tools/',
  );
  
  static const String _environment = String.fromEnvironment(
    'ENVIRONMENT',
    defaultValue: 'development',
  );

  // Getters
  static String get googleAdSenseClientId => _googleAdSenseClientId;
  static String get googleAdSenseBannerSlot => _googleAdSenseBannerSlot;
  static String get googleAdSenseSidebarSlot => _googleAdSenseSidebarSlot;
  static String get googleAnalyticsId => _googleAnalyticsId;
  static String get productionUrl => _productionUrl;
  static String get environment => _environment;
  
  // Helper methods
  static bool get isProduction => _environment == 'production';
  static bool get isDevelopment => _environment == 'development';
  static bool get hasGoogleAds => _googleAdSenseClientId.isNotEmpty;
  static bool get hasGoogleAnalytics => _googleAnalyticsId.isNotEmpty;
}
