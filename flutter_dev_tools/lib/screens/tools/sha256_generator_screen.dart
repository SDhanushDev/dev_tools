import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';
import '../../widgets/tool_layout.dart';
import '../../widgets/input_output_widget.dart';

class Sha256GeneratorScreen extends StatefulWidget {
  const Sha256GeneratorScreen({super.key});

  @override
  State<Sha256GeneratorScreen> createState() => _Sha256GeneratorScreenState();
}

class _Sha256GeneratorScreenState extends State<Sha256GeneratorScreen> {
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
    final digest = sha256.convert(bytes);
    
    setState(() {
      _output = digest.toString();
    });
  }

  void _copyToClipboard() {
    if (_output.isNotEmpty) {
      Clipboard.setData(ClipboardData(text: _output));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('SHA256 hash copied to clipboard!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ToolLayout(
      title: 'SHA256 Hash Generator',
      description: 'Generate SHA256 hashes from text input for security and verification',
      child: InputOutputWidget(
        inputController: _inputController,
        inputLabel: 'Text Input',
        inputHint: 'Enter text to generate SHA256 hash...',
        output: _output,
        outputLabel: 'SHA256 Hash',
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
