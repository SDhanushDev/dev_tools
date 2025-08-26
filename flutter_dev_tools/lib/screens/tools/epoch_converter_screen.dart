import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class EpochConverterScreen extends StatefulWidget {
  const EpochConverterScreen({super.key});

  @override
  State<EpochConverterScreen> createState() => _EpochConverterScreenState();
}

class _EpochConverterScreenState extends State<EpochConverterScreen> {
  final TextEditingController _epochController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();
  DateTime _currentDateTime = DateTime.now();
  bool _isMilliseconds = false;

  @override
  void initState() {
    super.initState();
    _updateFromCurrentTime();
  }

  @override
  void dispose() {
    _epochController.dispose();
    _dateController.dispose();
    super.dispose();
  }

  void _updateFromCurrentTime() {
    setState(() {
      _currentDateTime = DateTime.now();
      _epochController.text = _isMilliseconds 
          ? _currentDateTime.millisecondsSinceEpoch.toString()
          : (_currentDateTime.millisecondsSinceEpoch ~/ 1000).toString();
      _dateController.text = _currentDateTime.toIso8601String();
    });
  }

  void _convertFromEpoch() {
    final epochText = _epochController.text.trim();
    if (epochText.isEmpty) return;

    try {
      final epochValue = int.parse(epochText);
      final dateTime = _isMilliseconds 
          ? DateTime.fromMillisecondsSinceEpoch(epochValue)
          : DateTime.fromMillisecondsSinceEpoch(epochValue * 1000);
      
      setState(() {
        _currentDateTime = dateTime;
        _dateController.text = dateTime.toIso8601String();
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid epoch timestamp: $e')),
      );
    }
  }

  void _convertFromDate() {
    final dateText = _dateController.text.trim();
    if (dateText.isEmpty) return;

    try {
      final dateTime = DateTime.parse(dateText);
      setState(() {
        _currentDateTime = dateTime;
        _epochController.text = _isMilliseconds 
            ? dateTime.millisecondsSinceEpoch.toString()
            : (dateTime.millisecondsSinceEpoch ~/ 1000).toString();
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid date format: $e')),
      );
    }
  }

  void _copyToClipboard(String text, String type) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$type copied to clipboard!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Epoch Time Converter',
      description: 'Convert between epoch time and human-readable dates',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Current Time Section
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  theme.colorScheme.primary.withOpacity(0.1),
                  theme.colorScheme.secondary.withOpacity(0.1),
                ],
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Current Time',
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: _updateFromCurrentTime,
                      icon: const Icon(Icons.refresh, size: 16),
                      label: const Text('Now'),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Flexible(
                      child: _buildInfoCard(
                        'Epoch (seconds)',
                        (_currentDateTime.millisecondsSinceEpoch ~/ 1000).toString(),
                        theme,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Flexible(
                      child: _buildInfoCard(
                        'Epoch (milliseconds)',
                        _currentDateTime.millisecondsSinceEpoch.toString(),
                        theme,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                _buildInfoCard(
                  'Human Readable',
                  _currentDateTime.toString(),
                  theme,
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Converter Section
          Text(
            'Converter',
            style: GoogleFonts.inter(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Unit Toggle
          Container(
            margin: const EdgeInsets.only(bottom: 20),
            child: Row(
              children: [
                Text(
                  'Timestamp unit:',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(width: 12),
                SegmentedButton<bool>(
                  segments: const [
                    ButtonSegment(
                      value: false,
                      label: Text('Seconds'),
                    ),
                    ButtonSegment(
                      value: true,
                      label: Text('Milliseconds'),
                    ),
                  ],
                  selected: {_isMilliseconds},
                  onSelectionChanged: (Set<bool> selection) {
                    setState(() {
                      _isMilliseconds = selection.first;
                    });
                    _updateFromCurrentTime();
                  },
                ),
              ],
            ),
          ),
          
          // Input Fields
          LayoutBuilder(
            builder: (context, constraints) {
              final isWide = constraints.maxWidth > 600;
              
              return isWide
                  ? Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Flexible(child: _buildEpochInput(theme)),
                        const SizedBox(width: 20),
                        Flexible(child: _buildDateInput(theme)),
                      ],
                    )
                  : Column(
                      children: [
                        _buildEpochInput(theme),
                        const SizedBox(height: 20),
                        _buildDateInput(theme),
                      ],
                    );
            },
          ),
          
          const SizedBox(height: 24),
          
          // Format Examples
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      color: theme.colorScheme.primary,
                      size: 20,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Supported Date Formats',
                      style: GoogleFonts.inter(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  '• ISO 8601: 2023-12-25T10:30:00.000Z\n'
                  '• RFC 3339: 2023-12-25T10:30:00+00:00\n'
                  '• Simple: 2023-12-25 10:30:00\n'
                  '• Date only: 2023-12-25',
                  style: GoogleFonts.firaCode(
                    fontSize: 12,
                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEpochInput(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Epoch Timestamp',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: _epochController,
          onChanged: (_) => _convertFromEpoch(),
          keyboardType: TextInputType.number,
          style: GoogleFonts.firaCode(fontSize: 14),
          decoration: InputDecoration(
            hintText: _isMilliseconds 
                ? 'Enter timestamp in milliseconds...'
                : 'Enter timestamp in seconds...',
            hintStyle: GoogleFonts.firaCode(
              color: theme.colorScheme.onSurface.withOpacity(0.5),
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            suffixIcon: IconButton(
              icon: const Icon(Icons.copy, size: 20),
              onPressed: () => _copyToClipboard(
                _epochController.text,
                'Epoch timestamp',
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDateInput(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Human Readable Date',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: _dateController,
          onChanged: (_) => _convertFromDate(),
          style: GoogleFonts.firaCode(fontSize: 14),
          decoration: InputDecoration(
            hintText: 'Enter date (ISO 8601 format)...',
            hintStyle: GoogleFonts.firaCode(
              color: theme.colorScheme.onSurface.withOpacity(0.5),
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            suffixIcon: IconButton(
              icon: const Icon(Icons.copy, size: 20),
              onPressed: () => _copyToClipboard(
                _dateController.text,
                'Date string',
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildInfoCard(String label, String value, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface.withOpacity(0.8),
        borderRadius: BorderRadius.circular(8),
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
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }
}
