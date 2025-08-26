import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../config/environment.dart';
import 'dart:html' as html;

class GoogleAdsWidget extends StatefulWidget {
  final String adType; // 'banner', 'sidebar', 'square'
  final double? width;
  final double? height;

  const GoogleAdsWidget({
    super.key,
    required this.adType,
    this.width,
    this.height,
  });

  @override
  State<GoogleAdsWidget> createState() => _GoogleAdsWidgetState();
}

class _GoogleAdsWidgetState extends State<GoogleAdsWidget> {
  bool _isAdLoaded = false;
  bool _hasError = false;

  @override
  void initState() {
    super.initState();
    _loadAd();
  }

  void _loadAd() {
    if (!Environment.hasGoogleAds || !Environment.isProduction) {
      setState(() {
        _hasError = true;
      });
      return;
    }

    try {
      // In a real implementation, you would integrate with Google AdSense
      // For now, we'll simulate ad loading
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted) {
          setState(() {
            _isAdLoaded = true;
          });
        }
      });
    } catch (e) {
      setState(() {
        _hasError = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!Environment.hasGoogleAds || Environment.isDevelopment) {
      return _buildPlaceholder();
    }

    if (_hasError) {
      return const SizedBox.shrink();
    }

    if (!_isAdLoaded) {
      return _buildLoadingPlaceholder();
    }

    return _buildAdContainer();
  }

  Widget _buildAdContainer() {
    final theme = Theme.of(context);
    
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = widget.width ?? _getResponsiveWidth(constraints.maxWidth);
        final height = widget.height ?? _getDefaultHeight();
        
        return Container(
          width: width,
          height: height,
          constraints: BoxConstraints(
            maxWidth: constraints.maxWidth,
            minHeight: 60,
          ),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.2),
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.ads_click,
                  color: theme.colorScheme.primary,
                  size: 32,
                ),
                const SizedBox(height: 8),
                Text(
                  'Advertisement',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    color: theme.colorScheme.onSurface.withOpacity(0.6),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildPlaceholder() {
    final theme = Theme.of(context);
    
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = widget.width ?? _getResponsiveWidth(constraints.maxWidth);
        final height = widget.height ?? _getDefaultHeight();
        
        return Container(
          width: width,
          height: height,
          constraints: BoxConstraints(
            maxWidth: constraints.maxWidth,
            minHeight: 60,
          ),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.1),
              style: BorderStyle.solid,
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.ad_units_outlined,
                  color: theme.colorScheme.onSurface.withOpacity(0.3),
                  size: 24,
                ),
                const SizedBox(height: 4),
                Text(
                  'Ad Space',
                  style: GoogleFonts.inter(
                    fontSize: 10,
                    color: theme.colorScheme.onSurface.withOpacity(0.3),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingPlaceholder() {
    final theme = Theme.of(context);
    
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = widget.width ?? _getResponsiveWidth(constraints.maxWidth);
        final height = widget.height ?? _getDefaultHeight();
        
        return Container(
          width: width,
          height: height,
          constraints: BoxConstraints(
            maxWidth: constraints.maxWidth,
            minHeight: 60,
          ),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Center(
            child: SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          ),
        );
      },
    );
  }

  double _getDefaultWidth() {
    switch (widget.adType) {
      case 'banner':
        return 728;
      case 'sidebar':
        return 300;
      case 'square':
        return 250;
      default:
        return 300;
    }
  }

  double _getResponsiveWidth(double maxWidth) {
    switch (widget.adType) {
      case 'banner':
        return maxWidth > 728 ? 728 : maxWidth * 0.9;
      case 'sidebar':
        return maxWidth > 300 ? 300 : maxWidth * 0.8;
      case 'square':
        return maxWidth > 250 ? 250 : maxWidth * 0.8;
      default:
        return maxWidth > 300 ? 300 : maxWidth * 0.8;
    }
  }

  double _getDefaultHeight() {
    switch (widget.adType) {
      case 'banner':
        return 90;
      case 'sidebar':
        return 250;
      case 'square':
        return 250;
      default:
        return 250;
    }
  }
}
