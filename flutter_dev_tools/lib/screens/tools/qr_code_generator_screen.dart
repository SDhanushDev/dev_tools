import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../../widgets/tool_layout.dart';
import 'package:google_fonts/google_fonts.dart';

class QrCodeGeneratorScreen extends StatefulWidget {
  const QrCodeGeneratorScreen({super.key});

  @override
  State<QrCodeGeneratorScreen> createState() => _QrCodeGeneratorScreenState();
}

class _QrCodeGeneratorScreenState extends State<QrCodeGeneratorScreen> {
  final TextEditingController _textController = TextEditingController();
  String _qrData = 'https://flutter.dev';
  double _qrSize = 200.0;
  Color _foregroundColor = Colors.black;
  Color _backgroundColor = Colors.white;

  @override
  void initState() {
    super.initState();
    _textController.text = _qrData;
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _updateQrCode() {
    setState(() {
      _qrData = _textController.text.isEmpty ? 'Enter text to generate QR code' : _textController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'QR Code Generator',
      description: 'Generate QR codes from text or URLs with customizable appearance',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 800;
          
          return isWide
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 2, child: _buildInputSection(theme)),
                    const SizedBox(width: 24),
                    Expanded(flex: 3, child: _buildQrSection(theme)),
                  ],
                )
              : Column(
                  children: [
                    _buildInputSection(theme),
                    const SizedBox(height: 24),
                    _buildQrSection(theme),
                  ],
                );
        },
      ),
    );
  }

  Widget _buildInputSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'QR Code Content',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // Text Input
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.3),
            ),
          ),
          child: TextField(
            controller: _textController,
            onChanged: (_) => _updateQrCode(),
            maxLines: 4,
            style: GoogleFonts.firaCode(fontSize: 14),
            decoration: InputDecoration(
              hintText: 'Enter text, URL, or any data...',
              hintStyle: GoogleFonts.firaCode(
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.all(16),
            ),
          ),
        ),
        
        const SizedBox(height: 24),
        
        // Quick Templates
        Text(
          'Quick Templates',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildTemplateChip('Website', 'https://example.com', theme),
            _buildTemplateChip('Email', 'mailto:example@email.com', theme),
            _buildTemplateChip('Phone', 'tel:+1234567890', theme),
            _buildTemplateChip('WiFi', 'WIFI:T:WPA;S:NetworkName;P:Password;;', theme),
            _buildTemplateChip('SMS', 'sms:+1234567890', theme),
          ],
        ),
        
        const SizedBox(height: 24),
        
        // Customization Options
        Text(
          'Customization',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // Size Slider
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Size', style: GoogleFonts.inter(fontWeight: FontWeight.w500)),
                  Text('${_qrSize.round()}px', style: GoogleFonts.inter(color: theme.colorScheme.primary)),
                ],
              ),
              Slider(
                value: _qrSize,
                min: 100,
                max: 400,
                divisions: 30,
                onChanged: (value) {
                  setState(() {
                    _qrSize = value;
                  });
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildQrSection(ThemeData theme) {
    return Column(
      children: [
        Text(
          'Generated QR Code',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 16),
        
        // QR Code Display
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: _backgroundColor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: theme.colorScheme.outline.withOpacity(0.3),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Center(
            child: QrImageView(
              data: _qrData,
              version: QrVersions.auto,
              size: _qrSize,
              foregroundColor: _foregroundColor,
              backgroundColor: _backgroundColor,
              errorCorrectionLevel: QrErrorCorrectLevel.M,
            ),
          ),
        ),
        
        const SizedBox(height: 24),
        
        // Action Buttons
        Wrap(
          spacing: 12,
          runSpacing: 12,
          alignment: WrapAlignment.center,
          children: [
            ElevatedButton.icon(
              onPressed: () {
                // In a real app, you'd implement image saving here
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('QR Code download feature would be implemented here')),
                );
              },
              icon: const Icon(Icons.download),
              label: const Text('Download PNG'),
            ),
            OutlinedButton.icon(
              onPressed: () {
                Clipboard.setData(ClipboardData(text: _qrData));
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('QR Code data copied to clipboard!')),
                );
              },
              icon: const Icon(Icons.copy),
              label: const Text('Copy Data'),
            ),
          ],
        ),
        
        const SizedBox(height: 16),
        
        // Info Card
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
                    'QR Code Info',
                    style: GoogleFonts.inter(
                      fontWeight: FontWeight.w600,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Data: ${_qrData.length} characters\n'
                'Size: ${_qrSize.round()}x${_qrSize.round()} pixels\n'
                'Error Correction: Medium (15%)',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTemplateChip(String label, String template, ThemeData theme) {
    return ActionChip(
      label: Text(label),
      onPressed: () {
        _textController.text = template;
        _updateQrCode();
      },
      backgroundColor: theme.colorScheme.surfaceVariant.withOpacity(0.5),
    );
  }
}
