import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import '../../widgets/tool_layout.dart';
import '../../widgets/input_output_widget.dart';

class JsonFormatterScreen extends StatefulWidget {
  const JsonFormatterScreen({super.key});

  @override
  State<JsonFormatterScreen> createState() => _JsonFormatterScreenState();
}

class _JsonFormatterScreenState extends State<JsonFormatterScreen> {
  final TextEditingController _inputController = TextEditingController();
  String _output = '';
  String? _errorMessage;
  int _indentSize = 2;

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _formatJson() {
    final input = _inputController.text.trim();
    if (input.isEmpty) {
      setState(() {
        _output = '';
        _errorMessage = null;
      });
      return;
    }

    try {
      final jsonObject = jsonDecode(input);
      final encoder = JsonEncoder.withIndent(' ' * _indentSize);
      setState(() {
        _output = encoder.convert(jsonObject);
        _errorMessage = null;
      });
    } catch (e) {
      setState(() {
        _output = '';
        _errorMessage = 'Invalid JSON: ${e.toString()}';
      });
    }
  }

  void _minifyJson() {
    final input = _inputController.text.trim();
    if (input.isEmpty) return;

    try {
      final jsonObject = jsonDecode(input);
      setState(() {
        _output = jsonEncode(jsonObject);
        _errorMessage = null;
      });
    } catch (e) {
      setState(() {
        _output = '';
        _errorMessage = 'Invalid JSON: ${e.toString()}';
      });
    }
  }

  void _copyToClipboard() {
    if (_output.isNotEmpty) {
      Clipboard.setData(ClipboardData(text: _output));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Copied to clipboard!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ToolLayout(
      title: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      actions: [
        PopupMenuButton<int>(
          icon: const Icon(Icons.settings),
          onSelected: (value) {
            setState(() {
              _indentSize = value;
              if (_inputController.text.isNotEmpty) {
                _formatJson();
              }
            });
          },
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: 2,
              child: Text('2 spaces'),
            ),
            const PopupMenuItem(
              value: 4,
              child: Text('4 spaces'),
            ),
            const PopupMenuItem(
              value: 8,
              child: Text('8 spaces'),
            ),
          ],
        ),
      ],
      child: InputOutputWidget(
        inputController: _inputController,
        inputLabel: 'JSON Input',
        inputHint: 'Paste your JSON here...',
        output: _output,
        outputLabel: 'Formatted JSON',
        errorMessage: _errorMessage,
        onInputChanged: (_) => _formatJson(),
        actions: [
          ElevatedButton.icon(
            onPressed: _formatJson,
            icon: const Icon(Icons.auto_fix_high),
            label: const Text('Format'),
          ),
          const SizedBox(width: 12),
          OutlinedButton.icon(
            onPressed: _minifyJson,
            icon: const Icon(Icons.compress),
            label: const Text('Minify'),
          ),
          const SizedBox(width: 12),
          OutlinedButton.icon(
            onPressed: _copyToClipboard,
            icon: const Icon(Icons.copy),
            label: const Text('Copy'),
          ),
        ],
      ),
    );
  }
}
