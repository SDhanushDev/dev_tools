import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class TextCaseConverterScreen extends StatefulWidget {
  const TextCaseConverterScreen({super.key});

  @override
  State<TextCaseConverterScreen> createState() => _TextCaseConverterScreenState();
}

class _TextCaseConverterScreenState extends State<TextCaseConverterScreen> {
  final TextEditingController _inputController = TextEditingController();
  final Map<String, String> _outputs = {};

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _convertText() {
    final input = _inputController.text;
    if (input.isEmpty) {
      setState(() {
        _outputs.clear();
      });
      return;
    }

    setState(() {
      _outputs['lowercase'] = input.toLowerCase();
      _outputs['uppercase'] = input.toUpperCase();
      _outputs['title'] = _toTitleCase(input);
      _outputs['sentence'] = _toSentenceCase(input);
      _outputs['camel'] = _toCamelCase(input);
      _outputs['pascal'] = _toPascalCase(input);
      _outputs['snake'] = _toSnakeCase(input);
      _outputs['kebab'] = _toKebabCase(input);
      _outputs['constant'] = _toConstantCase(input);
    });
  }

  String _toTitleCase(String text) {
    return text.split(' ').map((word) {
      if (word.isEmpty) return word;
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ');
  }

  String _toSentenceCase(String text) {
    if (text.isEmpty) return text;
    return text[0].toUpperCase() + text.substring(1).toLowerCase();
  }

  String _toCamelCase(String text) {
    final words = text.split(RegExp(r'[\s_-]+'));
    if (words.isEmpty) return '';
    
    String result = words[0].toLowerCase();
    for (int i = 1; i < words.length; i++) {
      if (words[i].isNotEmpty) {
        result += words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
      }
    }
    return result;
  }

  String _toPascalCase(String text) {
    final words = text.split(RegExp(r'[\s_-]+'));
    return words.map((word) {
      if (word.isEmpty) return word;
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }).join('');
  }

  String _toSnakeCase(String text) {
    return text
        .replaceAll(RegExp(r'[\s-]+'), '_')
        .replaceAll(RegExp(r'([a-z])([A-Z])'), r'$1_$2')
        .toLowerCase();
  }

  String _toKebabCase(String text) {
    return text
        .replaceAll(RegExp(r'[\s_]+'), '-')
        .replaceAll(RegExp(r'([a-z])([A-Z])'), r'$1-$2')
        .toLowerCase();
  }

  String _toConstantCase(String text) {
    return _toSnakeCase(text).toUpperCase();
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Copied to clipboard!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Text Case Converter',
      description: 'Convert text between different cases (camelCase, snake_case, kebab-case, etc.)',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Input Section
          Text(
            'Input Text',
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.3),
              ),
            ),
            child: TextField(
              controller: _inputController,
              onChanged: (_) => _convertText(),
              maxLines: 3,
              style: GoogleFonts.firaCode(fontSize: 14),
              decoration: InputDecoration(
                hintText: 'Enter text to convert (e.g., "Hello World", "hello_world", "helloWorld")...',
                hintStyle: GoogleFonts.firaCode(
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.all(16),
              ),
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Output Section
          Text(
            'Converted Text',
            style: GoogleFonts.inter(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Conversion Results
          if (_outputs.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  'Enter text above to see conversions',
                  style: GoogleFonts.inter(
                    color: theme.colorScheme.onSurface.withOpacity(0.5),
                  ),
                ),
              ),
            )
          else
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              childAspectRatio: 3,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              children: [
                _buildCaseCard('lowercase', 'Lowercase', _outputs['lowercase']!, theme),
                _buildCaseCard('uppercase', 'UPPERCASE', _outputs['uppercase']!, theme),
                _buildCaseCard('title', 'Title Case', _outputs['title']!, theme),
                _buildCaseCard('sentence', 'Sentence case', _outputs['sentence']!, theme),
                _buildCaseCard('camel', 'camelCase', _outputs['camel']!, theme),
                _buildCaseCard('pascal', 'PascalCase', _outputs['pascal']!, theme),
                _buildCaseCard('snake', 'snake_case', _outputs['snake']!, theme),
                _buildCaseCard('kebab', 'kebab-case', _outputs['kebab']!, theme),
                _buildCaseCard('constant', 'CONSTANT_CASE', _outputs['constant']!, theme),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildCaseCard(String key, String label, String value, ThemeData theme) {
    return Container(
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
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceVariant.withOpacity(0.5),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  label,
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.copy, size: 16),
                  onPressed: () => _copyToClipboard(value),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(minWidth: 24, minHeight: 24),
                ),
              ],
            ),
          ),
          
          // Content
          Flexible(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: SelectableText(
                value,
                style: GoogleFonts.firaCode(
                  fontSize: 13,
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
