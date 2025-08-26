import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:math';
import '../../widgets/tool_layout.dart';
import 'package:google_fonts/google_fonts.dart';

class PasswordGeneratorScreen extends StatefulWidget {
  const PasswordGeneratorScreen({super.key});

  @override
  State<PasswordGeneratorScreen> createState() => _PasswordGeneratorScreenState();
}

class _PasswordGeneratorScreenState extends State<PasswordGeneratorScreen> {
  int _length = 16;
  bool _includeUppercase = true;
  bool _includeLowercase = true;
  bool _includeNumbers = true;
  bool _includeSymbols = true;
  String _generatedPassword = '';

  final String _uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  final String _lowercase = 'abcdefghijklmnopqrstuvwxyz';
  final String _numbers = '0123456789';
  final String _symbols = '!@#\$%^&*()_+-=[]{}|;:,.<>?';

  @override
  void initState() {
    super.initState();
    _generatePassword();
  }

  void _generatePassword() {
    if (!_includeUppercase && !_includeLowercase && !_includeNumbers && !_includeSymbols) {
      setState(() {
        _generatedPassword = '';
      });
      return;
    }

    String charset = '';
    if (_includeUppercase) charset += _uppercase;
    if (_includeLowercase) charset += _lowercase;
    if (_includeNumbers) charset += _numbers;
    if (_includeSymbols) charset += _symbols;

    final random = Random.secure();
    final password = List.generate(
      _length,
      (index) => charset[random.nextInt(charset.length)],
    ).join();

    setState(() {
      _generatedPassword = password;
    });
  }

  void _copyToClipboard() {
    if (_generatedPassword.isNotEmpty) {
      Clipboard.setData(ClipboardData(text: _generatedPassword));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Password copied to clipboard!')),
      );
    }
  }

  Color _getStrengthColor() {
    final score = _calculateStrength();
    if (score < 30) return Colors.red;
    if (score < 60) return Colors.orange;
    if (score < 80) return Colors.yellow;
    return Colors.green;
  }

  String _getStrengthText() {
    final score = _calculateStrength();
    if (score < 30) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Strong';
  }

  int _calculateStrength() {
    int score = 0;
    score += _length * 2;
    if (_includeUppercase) score += 10;
    if (_includeLowercase) score += 10;
    if (_includeNumbers) score += 10;
    if (_includeSymbols) score += 15;
    return score.clamp(0, 100);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Password Generator',
      description: 'Generate secure random passwords with customizable options',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Password Display
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
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
                      'Generated Password',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: _getStrengthColor().withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            _getStrengthText(),
                            style: GoogleFonts.inter(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: _getStrengthColor(),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: theme.colorScheme.outline.withOpacity(0.2),
                    ),
                  ),
                  child: SelectableText(
                    _generatedPassword.isEmpty ? 'Select at least one character type' : _generatedPassword,
                    style: GoogleFonts.firaCode(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: _generatedPassword.isEmpty 
                          ? theme.colorScheme.onSurface.withOpacity(0.5)
                          : theme.colorScheme.onSurface,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    ElevatedButton.icon(
                      onPressed: _generatePassword,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Generate New'),
                    ),
                    const SizedBox(width: 12),
                    OutlinedButton.icon(
                      onPressed: _generatedPassword.isNotEmpty ? _copyToClipboard : null,
                      icon: const Icon(Icons.copy),
                      label: const Text('Copy'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Options
          Text(
            'Password Options',
            style: GoogleFonts.inter(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Length Slider
          Container(
            padding: const EdgeInsets.all(20),
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
                      'Length',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '$_length',
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Slider(
                  value: _length.toDouble(),
                  min: 4,
                  max: 50,
                  divisions: 46,
                  onChanged: (value) {
                    setState(() {
                      _length = value.round();
                    });
                    _generatePassword();
                  },
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Character Types
          Container(
            padding: const EdgeInsets.all(20),
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
                  'Character Types',
                  style: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 16),
                CheckboxListTile(
                  title: const Text('Uppercase Letters (A-Z)'),
                  subtitle: Text(
                    _uppercase,
                    style: GoogleFonts.firaCode(fontSize: 12),
                  ),
                  value: _includeUppercase,
                  onChanged: (value) {
                    setState(() {
                      _includeUppercase = value ?? false;
                    });
                    _generatePassword();
                  },
                  contentPadding: EdgeInsets.zero,
                ),
                CheckboxListTile(
                  title: const Text('Lowercase Letters (a-z)'),
                  subtitle: Text(
                    _lowercase,
                    style: GoogleFonts.firaCode(fontSize: 12),
                  ),
                  value: _includeLowercase,
                  onChanged: (value) {
                    setState(() {
                      _includeLowercase = value ?? false;
                    });
                    _generatePassword();
                  },
                  contentPadding: EdgeInsets.zero,
                ),
                CheckboxListTile(
                  title: const Text('Numbers (0-9)'),
                  subtitle: Text(
                    _numbers,
                    style: GoogleFonts.firaCode(fontSize: 12),
                  ),
                  value: _includeNumbers,
                  onChanged: (value) {
                    setState(() {
                      _includeNumbers = value ?? false;
                    });
                    _generatePassword();
                  },
                  contentPadding: EdgeInsets.zero,
                ),
                CheckboxListTile(
                  title: const Text('Symbols'),
                  subtitle: Text(
                    _symbols,
                    style: GoogleFonts.firaCode(fontSize: 12),
                  ),
                  value: _includeSymbols,
                  onChanged: (value) {
                    setState(() {
                      _includeSymbols = value ?? false;
                    });
                    _generatePassword();
                  },
                  contentPadding: EdgeInsets.zero,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
