import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class GradientGeneratorScreen extends StatefulWidget {
  const GradientGeneratorScreen({super.key});

  @override
  State<GradientGeneratorScreen> createState() => _GradientGeneratorScreenState();
}

class _GradientGeneratorScreenState extends State<GradientGeneratorScreen> {
  Color _startColor = Colors.blue;
  Color _endColor = Colors.purple;
  AlignmentGeometry _begin = Alignment.topLeft;
  AlignmentGeometry _end = Alignment.bottomRight;
  bool _isLinear = true;

  String get _cssGradient {
    final startHex = '#${_startColor.value.toRadixString(16).substring(2)}';
    final endHex = '#${_endColor.value.toRadixString(16).substring(2)}';
    
    if (_isLinear) {
      final angle = _getLinearAngle();
      return 'linear-gradient(${angle}deg, $startHex, $endHex)';
    } else {
      return 'radial-gradient(circle, $startHex, $endHex)';
    }
  }

  int _getLinearAngle() {
    if (_begin == Alignment.topLeft && _end == Alignment.bottomRight) return 135;
    if (_begin == Alignment.topCenter && _end == Alignment.bottomCenter) return 180;
    if (_begin == Alignment.topRight && _end == Alignment.bottomLeft) return 225;
    if (_begin == Alignment.centerLeft && _end == Alignment.centerRight) return 90;
    if (_begin == Alignment.centerRight && _end == Alignment.centerLeft) return 270;
    return 135; // default
  }

  void _copyToClipboard() {
    Clipboard.setData(ClipboardData(text: _cssGradient));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('CSS gradient copied to clipboard!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Gradient Generator',
      description: 'Create CSS gradients with live preview and customizable colors',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 800;
          
          return isWide
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 2, child: _buildPreview(theme)),
                    const SizedBox(width: 24),
                    Expanded(flex: 1, child: _buildControls(theme)),
                  ],
                )
              : Column(
                  children: [
                    _buildPreview(theme),
                    const SizedBox(height: 24),
                    _buildControls(theme),
                  ],
                );
        },
      ),
    );
  }

  Widget _buildPreview(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Gradient Preview',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // Gradient Preview
        Container(
          width: double.infinity,
          height: 300,
          decoration: BoxDecoration(
            gradient: _isLinear
                ? LinearGradient(
                    begin: _begin,
                    end: _end,
                    colors: [_startColor, _endColor],
                  )
                : RadialGradient(
                    colors: [_startColor, _endColor],
                  ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.3),
            ),
          ),
        ),
        
        const SizedBox(height: 24),
        
        // CSS Output
        Text(
          'CSS Code',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.3),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'background:',
                    style: GoogleFonts.firaCode(
                      fontSize: 14,
                      color: theme.colorScheme.onSurface.withOpacity(0.7),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.copy, size: 20),
                    onPressed: _copyToClipboard,
                  ),
                ],
              ),
              SelectableText(
                _cssGradient,
                style: GoogleFonts.firaCode(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildControls(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Gradient Settings',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // Gradient Type
        Container(
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
              Text(
                'Gradient Type',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              SegmentedButton<bool>(
                segments: const [
                  ButtonSegment(
                    value: true,
                    label: Text('Linear'),
                    icon: Icon(Icons.linear_scale),
                  ),
                  ButtonSegment(
                    value: false,
                    label: Text('Radial'),
                    icon: Icon(Icons.radio_button_unchecked),
                  ),
                ],
                selected: {_isLinear},
                onSelectionChanged: (Set<bool> selection) {
                  setState(() {
                    _isLinear = selection.first;
                  });
                },
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 16),
        
        // Colors
        Container(
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
              Text(
                'Colors',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              
              // Start Color
              Row(
                children: [
                  Text('Start:', style: GoogleFonts.inter(fontSize: 12)),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () => _showColorPicker(_startColor, (color) {
                      setState(() => _startColor = color);
                    }),
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: _startColor,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: theme.colorScheme.outline.withOpacity(0.3),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      '#${_startColor.value.toRadixString(16).substring(2).toUpperCase()}',
                      style: GoogleFonts.firaCode(fontSize: 12),
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 12),
              
              // End Color
              Row(
                children: [
                  Text('End:  ', style: GoogleFonts.inter(fontSize: 12)),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () => _showColorPicker(_endColor, (color) {
                      setState(() => _endColor = color);
                    }),
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: _endColor,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: theme.colorScheme.outline.withOpacity(0.3),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      '#${_endColor.value.toRadixString(16).substring(2).toUpperCase()}',
                      style: GoogleFonts.firaCode(fontSize: 12),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        
        if (_isLinear) ...[
          const SizedBox(height: 16),
          
          // Direction (Linear only)
          Container(
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
                Text(
                  'Direction',
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
                    _buildDirectionChip('↘', Alignment.topLeft, Alignment.bottomRight),
                    _buildDirectionChip('↓', Alignment.topCenter, Alignment.bottomCenter),
                    _buildDirectionChip('↙', Alignment.topRight, Alignment.bottomLeft),
                    _buildDirectionChip('→', Alignment.centerLeft, Alignment.centerRight),
                    _buildDirectionChip('←', Alignment.centerRight, Alignment.centerLeft),
                  ],
                ),
              ],
            ),
          ),
        ],
        
        const SizedBox(height: 24),
        
        // Action Button
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: _copyToClipboard,
            icon: const Icon(Icons.copy),
            label: const Text('Copy CSS'),
          ),
        ),
      ],
    );
  }

  Widget _buildDirectionChip(String label, AlignmentGeometry begin, AlignmentGeometry end) {
    final isSelected = _begin == begin && _end == end;
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _begin = begin;
          _end = end;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected 
              ? theme.colorScheme.primary.withOpacity(0.2)
              : theme.colorScheme.surfaceVariant.withOpacity(0.5),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected 
                ? theme.colorScheme.primary
                : theme.colorScheme.outline.withOpacity(0.3),
          ),
        ),
        child: Text(
          label,
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w500,
            color: isSelected 
                ? theme.colorScheme.primary
                : theme.colorScheme.onSurface,
          ),
        ),
      ),
    );
  }

  void _showColorPicker(Color currentColor, ValueChanged<Color> onColorChanged) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Pick a color'),
        content: SingleChildScrollView(
          child: BlockPicker(
            pickerColor: currentColor,
            onColorChanged: onColorChanged,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Done'),
          ),
        ],
      ),
    );
  }
}

class BlockPicker extends StatelessWidget {
  final Color pickerColor;
  final ValueChanged<Color> onColorChanged;

  const BlockPicker({
    super.key,
    required this.pickerColor,
    required this.onColorChanged,
  });

  @override
  Widget build(BuildContext context) {
    final colors = [
      Colors.red, Colors.pink, Colors.purple, Colors.deepPurple,
      Colors.indigo, Colors.blue, Colors.lightBlue, Colors.cyan,
      Colors.teal, Colors.green, Colors.lightGreen, Colors.lime,
      Colors.yellow, Colors.amber, Colors.orange, Colors.deepOrange,
      Colors.brown, Colors.grey, Colors.blueGrey, Colors.black,
    ];

    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: colors.map((color) => GestureDetector(
        onTap: () => onColorChanged(color),
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: pickerColor.value == color.value 
                  ? Colors.white 
                  : Colors.transparent,
              width: 2,
            ),
          ),
        ),
      )).toList(),
    );
  }
}
