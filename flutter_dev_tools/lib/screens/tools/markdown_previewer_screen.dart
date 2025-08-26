import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../widgets/tool_layout.dart';

class MarkdownPreviewerScreen extends StatefulWidget {
  const MarkdownPreviewerScreen({super.key});

  @override
  State<MarkdownPreviewerScreen> createState() => _MarkdownPreviewerScreenState();
}

class _MarkdownPreviewerScreenState extends State<MarkdownPreviewerScreen> {
  final TextEditingController _markdownController = TextEditingController();
  
  final String _sampleMarkdown = '''# Welcome to Markdown Previewer

This is a **live markdown previewer** that renders your markdown in real-time.

## Features

- **Bold** and *italic* text
- `Inline code` and code blocks
- [Links](https://flutter.dev)
- Lists and tables
- Images and more!

### Code Example

```dart
void main() {
  print('Hello, Flutter!');
}
```

### List Example

1. First item
2. Second item
   - Nested item
   - Another nested item

### Table Example

| Feature | Supported |
|---------|-----------|
| Headers | ✅ |
| Lists | ✅ |
| Code | ✅ |
| Tables | ✅ |

> This is a blockquote. You can use it for important notes or citations.

---

**Try editing the markdown on the left to see the preview update in real-time!**
''';

  @override
  void initState() {
    super.initState();
    _markdownController.text = _sampleMarkdown;
  }

  @override
  void dispose() {
    _markdownController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'Markdown Previewer',
      description: 'Preview markdown content with live rendering and syntax highlighting',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 800;
          
          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Action Buttons
              Row(
                children: [
                  ElevatedButton.icon(
                    onPressed: () {
                      _markdownController.clear();
                    },
                    icon: const Icon(Icons.clear),
                    label: const Text('Clear'),
                  ),
                  const SizedBox(width: 12),
                  OutlinedButton.icon(
                    onPressed: () {
                      _markdownController.text = _sampleMarkdown;
                    },
                    icon: const Icon(Icons.restore),
                    label: const Text('Load Sample'),
                  ),
                ],
              ),
              
              const SizedBox(height: 20),
              
              // Editor and Preview
              SizedBox(
                height: isWide ? 500 : 620,
                child: isWide
                    ? Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(child: _buildEditor(theme)),
                          const SizedBox(width: 20),
                          Expanded(child: _buildPreview(theme)),
                        ],
                      )
                    : Column(
                        children: [
                          SizedBox(
                            height: 300,
                            child: _buildEditor(theme),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            height: 300,
                            child: _buildPreview(theme),
                          ),
                        ],
                      ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildEditor(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Markdown Editor',
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              border: Border.all(color: theme.colorScheme.outline),
              borderRadius: BorderRadius.circular(8),
            ),
            child: TextField(
              controller: _markdownController,
              onChanged: (_) => setState(() {}),
              maxLines: null,
              expands: true,
              style: GoogleFonts.jetBrainsMono(
                fontSize: 14,
                color: theme.colorScheme.onSurface,
              ),
              decoration: InputDecoration(
                hintText: 'Enter your markdown here...',
                hintStyle: GoogleFonts.jetBrainsMono(
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.all(16),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPreview(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Live Preview',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.3),
              ),
            ),
            child: _markdownController.text.isEmpty
                ? Center(
                    child: Text(
                      'Markdown preview will appear here...',
                      style: GoogleFonts.inter(
                        color: theme.colorScheme.onSurface.withOpacity(0.5),
                      ),
                    ),
                  )
                : SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: MarkdownBody(
                      data: _markdownController.text,
                      selectable: true,
                      styleSheet: MarkdownStyleSheet(
                        h1: GoogleFonts.inter(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: theme.colorScheme.onSurface,
                        ),
                        h2: GoogleFonts.inter(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: theme.colorScheme.onSurface,
                        ),
                        p: GoogleFonts.inter(
                          fontSize: 16,
                          color: theme.colorScheme.onSurface,
                          height: 1.5,
                        ),
                        code: GoogleFonts.firaCode(
                          fontSize: 14,
                          backgroundColor: theme.colorScheme.surfaceVariant,
                        ),
                        codeblockDecoration: BoxDecoration(
                          color: theme.colorScheme.surfaceVariant,
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ),
          ),
        ),
      ],
    );
  }
}
