import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class ColorPickerScreen extends StatefulWidget {
  const ColorPickerScreen({super.key});

  @override
  State<ColorPickerScreen> createState() => _ColorPickerScreenState();
}

class _ColorPickerScreenState extends State<ColorPickerScreen> {
  Color _currentColor = Colors.blue;
  final List<Color> _colorHistory = [];

  @override
  void initState() {
    super.initState();
    _addToHistory(_currentColor);
  }

  void _addToHistory(Color color) {
    setState(() {
      _colorHistory.removeWhere((c) => c.value == color.value);
      _colorHistory.insert(0, color);
      if (_colorHistory.length > 10) {
        _colorHistory.removeLast();
      }
    });
  }

  void _copyToClipboard(String text, String format) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$format copied to clipboard!')),
    );
  }

  String _getHex() => '#${_currentColor.value.toRadixString(16).substring(2).toUpperCase()}';
  String _getRgb() => 'rgb(${_currentColor.red}, ${_currentColor.green}, ${_currentColor.blue})';
  String _getRgba() => 'rgba(${_currentColor.red}, ${_currentColor.green}, ${_currentColor.blue}, ${(_currentColor.alpha / 255).toStringAsFixed(2)})';
  String _getHsl() {
    final hsl = HSLColor.fromColor(_currentColor);
    return 'hsl(${hsl.hue.round()}, ${(hsl.saturation * 100).round()}%, ${(hsl.lightness * 100).round()}%)';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Color Picker',
      description: 'Pick colors and get hex, RGB, HSL values with live preview',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 800;
          
          return isWide
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 2, child: _buildColorPicker(theme)),
                    const SizedBox(width: 24),
                    Expanded(flex: 1, child: _buildColorInfo(theme)),
                  ],
                )
              : Column(
                  children: [
                    _buildColorPicker(theme),
                    const SizedBox(height: 24),
                    _buildColorInfo(theme),
                  ],
                );
        },
      ),
    );
  }

  Widget _buildColorPicker(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Color Picker',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.2),
            ),
          ),
          child: Column(
            children: [
              // Current Color Display
              Container(
                width: double.infinity,
                height: 80,
                decoration: BoxDecoration(
                  color: _currentColor,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: theme.colorScheme.outline.withOpacity(0.3),
                    width: 2,
                  ),
                ),
              ),
              
              const SizedBox(height: 20),
              
              // Color Picker Widget
              LayoutBuilder(
                builder: (context, constraints) {
                  // Calculate responsive width with more aggressive padding
                  final availableWidth = constraints.maxWidth - 80; // More padding for safety
                  final pickerWidth = (availableWidth > 280 ? 280 : availableWidth.clamp(200.0, 280.0)).toDouble();
                  
                  return ClipRect(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: availableWidth,
                        maxHeight: 300,
                      ),
                      child: ColorPicker(
                        pickerColor: _currentColor,
                        onColorChanged: (color) {
                          setState(() {
                            _currentColor = color;
                          });
                        },
                        colorPickerWidth: pickerWidth,
                        pickerAreaHeightPercent: 0.6,
                        enableAlpha: true,
                        displayThumbColor: true,
                        paletteType: PaletteType.hsl,
                        labelTypes: const [],
                        pickerAreaBorderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  );
                },
              ),
              
              const SizedBox(height: 20),
              
              // Preset Colors
              Text(
                'Preset Colors',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  Colors.red,
                  Colors.pink,
                  Colors.purple,
                  Colors.deepPurple,
                  Colors.indigo,
                  Colors.blue,
                  Colors.lightBlue,
                  Colors.cyan,
                  Colors.teal,
                  Colors.green,
                  Colors.lightGreen,
                  Colors.lime,
                  Colors.yellow,
                  Colors.amber,
                  Colors.orange,
                  Colors.deepOrange,
                  Colors.brown,
                  Colors.grey,
                  Colors.blueGrey,
                  Colors.black,
                ].map((color) => GestureDetector(
                  onTap: () {
                    setState(() {
                      _currentColor = color;
                    });
                    _addToHistory(color);
                  },
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: theme.colorScheme.outline.withOpacity(0.3),
                      ),
                    ),
                  ),
                )).toList(),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildColorInfo(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Color Values',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // Color Format Cards
        _buildFormatCard('HEX', _getHex(), theme),
        const SizedBox(height: 12),
        _buildFormatCard('RGB', _getRgb(), theme),
        const SizedBox(height: 12),
        _buildFormatCard('RGBA', _getRgba(), theme),
        const SizedBox(height: 12),
        _buildFormatCard('HSL', _getHsl(), theme),
        
        const SizedBox(height: 24),
        
        // Color History
        if (_colorHistory.isNotEmpty) ...[
          Text(
            'Recent Colors',
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.2),
              ),
            ),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _colorHistory.map((color) => GestureDetector(
                onTap: () {
                  setState(() {
                    _currentColor = color;
                  });
                },
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: _currentColor.value == color.value
                          ? theme.colorScheme.primary
                          : theme.colorScheme.outline.withOpacity(0.3),
                      width: _currentColor.value == color.value ? 2 : 1,
                    ),
                  ),
                ),
              )).toList(),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildFormatCard(String label, String value, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colorScheme.outline.withOpacity(0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label,
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.copy, size: 16),
                onPressed: () => _copyToClipboard(value, label),
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 24, minHeight: 24),
              ),
            ],
          ),
          const SizedBox(height: 4),
          SelectableText(
            value,
            style: GoogleFonts.firaCode(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }
}
