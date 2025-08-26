import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';
import '../../widgets/tool_layout.dart';
import '../../widgets/input_output_widget.dart';

class Md5GeneratorScreen extends StatefulWidget {
  const Md5GeneratorScreen({super.key});

  @override
  State<Md5GeneratorScreen> createState() => _Md5GeneratorScreenState();
}

class _Md5GeneratorScreenState extends State<Md5GeneratorScreen> {
  final TextEditingController _inputController = TextEditingController();
  String _output = '';

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _generateHash() {
    final input = _inputController.text;
    if (input.isEmpty) {
      setState(() {
        _output = '';
      });
      return;
    }

    final bytes = utf8.encode(input);
    final digest = md5.convert(bytes);
    
    setState(() {
      _output = digest.toString();
    });
  }

  void _copyToClipboard() {
    if (_output.isNotEmpty) {
      Clipboard.setData(ClipboardData(text: _output));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('MD5 hash copied to clipboard!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ToolLayout(
      title: 'MD5 Hash Generator',
      description: 'Generate MD5 hashes from text input (Note: MD5 is cryptographically broken)',
      child: InputOutputWidget(
        inputController: _inputController,
        inputLabel: 'Text Input',
        inputHint: 'Enter text to generate MD5 hash...',
        output: _output,
        outputLabel: 'MD5 Hash',
        onInputChanged: (_) => _generateHash(),
        actions: [
          ElevatedButton.icon(
            onPressed: _generateHash,
            icon: const Icon(Icons.tag),
            label: const Text('Generate Hash'),
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
