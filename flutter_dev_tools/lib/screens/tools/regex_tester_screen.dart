import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class RegexTesterScreen extends StatefulWidget {
  const RegexTesterScreen({super.key});

  @override
  State<RegexTesterScreen> createState() => _RegexTesterScreenState();
}

class _RegexTesterScreenState extends State<RegexTesterScreen> {
  final TextEditingController _regexController = TextEditingController();
  final TextEditingController _testStringController = TextEditingController();
  List<RegExpMatch> _matches = [];
  String? _errorMessage;
  bool _caseSensitive = true;
  bool _multiLine = false;
  bool _dotAll = false;

  @override
  void dispose() {
    _regexController.dispose();
    _testStringController.dispose();
    super.dispose();
  }

  void _testRegex() {
    final pattern = _regexController.text;
    final testString = _testStringController.text;

    if (pattern.isEmpty || testString.isEmpty) {
      setState(() {
        _matches = [];
        _errorMessage = null;
      });
      return;
    }

    try {
      final regex = RegExp(
        pattern,
        caseSensitive: _caseSensitive,
        multiLine: _multiLine,
        dotAll: _dotAll,
      );
      
      setState(() {
        _matches = regex.allMatches(testString).toList();
        _errorMessage = null;
      });
    } catch (e) {
      setState(() {
        _matches = [];
        _errorMessage = 'Invalid regex pattern: ${e.toString()}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Regex Tester',
      description: 'Test and debug regular expressions with real-time matching and highlighting',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Regex Pattern Input
          _buildSection(
            'Regular Expression Pattern',
            TextField(
              controller: _regexController,
              onChanged: (_) => _testRegex(),
              style: GoogleFonts.firaCode(fontSize: 16),
              decoration: InputDecoration(
                hintText: 'Enter your regex pattern (e.g., \\d+|[a-zA-Z]+)',
                hintStyle: GoogleFonts.firaCode(
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.code),
              ),
            ),
            theme,
          ),

          const SizedBox(height: 20),

          // Regex Flags
          _buildSection(
            'Flags',
            Wrap(
              spacing: 16,
              children: [
                _buildFlagCheckbox('Case Sensitive', _caseSensitive, (value) {
                  setState(() => _caseSensitive = value);
                  _testRegex();
                }),
                _buildFlagCheckbox('Multi-line', _multiLine, (value) {
                  setState(() => _multiLine = value);
                  _testRegex();
                }),
                _buildFlagCheckbox('Dot All', _dotAll, (value) {
                  setState(() => _dotAll = value);
                  _testRegex();
                }),
              ],
            ),
            theme,
          ),

          const SizedBox(height: 20),

          // Test String Input
          _buildSection(
            'Test String',
            TextField(
              controller: _testStringController,
              onChanged: (_) => _testRegex(),
              maxLines: 6,
              style: GoogleFonts.firaCode(fontSize: 14),
              decoration: InputDecoration(
                hintText: 'Enter text to test against your regex pattern...',
                hintStyle: GoogleFonts.firaCode(
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                alignLabelWithHint: true,
              ),
            ),
            theme,
          ),

          const SizedBox(height: 20),

          // Results Section
          _buildResultsSection(theme),
        ],
      ),
    );
  }

  Widget _buildSection(String title, Widget child, ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        child,
      ],
    );
  }

  Widget _buildFlagCheckbox(String label, bool value, ValueChanged<bool> onChanged) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Checkbox(
          value: value,
          onChanged: (newValue) => onChanged(newValue ?? false),
        ),
        Text(label),
      ],
    );
  }

  Widget _buildResultsSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Results',
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.onSurface,
              ),
            ),
            if (_matches.isNotEmpty)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  '${_matches.length} matches',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(height: 16),

        // Error Message
        if (_errorMessage != null)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.errorContainer.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: theme.colorScheme.error),
            ),
            child: Row(
              children: [
                Icon(Icons.error_outline, color: theme.colorScheme.error),
                const SizedBox(width: 12),
                Flexible(
                  child: Text(
                    _errorMessage!,
                    style: GoogleFonts.inter(
                      color: theme.colorScheme.error,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          )
        else
          // Highlighted Text Display
          Container(
            width: double.infinity,
            constraints: const BoxConstraints(minHeight: 120),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.3),
              ),
            ),
            child: _buildHighlightedText(theme),
          ),

        if (_matches.isNotEmpty) ...[
          const SizedBox(height: 20),
          
          // Matches List
          Container(
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
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    'Match Details',
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _matches.length,
                  separatorBuilder: (context, index) => Divider(
                    height: 1,
                    color: theme.colorScheme.outline.withOpacity(0.2),
                  ),
                  itemBuilder: (context, index) {
                    final match = _matches[index];
                    return ListTile(
                      title: Text(
                        'Match ${index + 1}',
                        style: GoogleFonts.inter(fontWeight: FontWeight.w500),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Text: "${match.group(0)}"',
                            style: GoogleFonts.firaCode(fontSize: 12),
                          ),
                          Text(
                            'Position: ${match.start}-${match.end}',
                            style: GoogleFonts.inter(fontSize: 12),
                          ),
                        ],
                      ),
                      trailing: IconButton(
                        icon: const Icon(Icons.copy, size: 20),
                        onPressed: () {
                          Clipboard.setData(ClipboardData(text: match.group(0) ?? ''));
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Match copied to clipboard!')),
                          );
                        },
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildHighlightedText(ThemeData theme) {
    final testString = _testStringController.text;
    
    if (testString.isEmpty) {
      return Text(
        'Enter text above to see matches highlighted here...',
        style: GoogleFonts.firaCode(
          color: theme.colorScheme.onSurface.withOpacity(0.5),
        ),
      );
    }

    if (_matches.isEmpty) {
      return SelectableText(
        testString,
        style: GoogleFonts.firaCode(fontSize: 14),
      );
    }

    // Build highlighted text
    final spans = <TextSpan>[];
    int lastEnd = 0;

    for (final match in _matches) {
      // Add text before match
      if (match.start > lastEnd) {
        spans.add(TextSpan(
          text: testString.substring(lastEnd, match.start),
          style: GoogleFonts.firaCode(fontSize: 14),
        ));
      }

      // Add highlighted match
      spans.add(TextSpan(
        text: match.group(0),
        style: GoogleFonts.firaCode(
          fontSize: 14,
          backgroundColor: theme.colorScheme.primary.withOpacity(0.3),
          color: theme.colorScheme.onSurface,
          fontWeight: FontWeight.w600,
        ),
      ));

      lastEnd = match.end;
    }

    // Add remaining text
    if (lastEnd < testString.length) {
      spans.add(TextSpan(
        text: testString.substring(lastEnd),
        style: GoogleFonts.firaCode(fontSize: 14),
      ));
    }

    return SelectableText.rich(
      TextSpan(children: spans),
    );
  }
}
