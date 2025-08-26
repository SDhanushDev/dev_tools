import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import '../../widgets/tool_layout.dart';
import '../../widgets/input_output_widget.dart';

class Base64EncoderScreen extends StatefulWidget {
  const Base64EncoderScreen({super.key});

  @override
  State<Base64EncoderScreen> createState() => _Base64EncoderScreenState();
}

class _Base64EncoderScreenState extends State<Base64EncoderScreen> {
  final TextEditingController _inputController = TextEditingController();
  String _output = '';
  String? _errorMessage;
  bool _isEncoding = true;

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _processText() {
    final input = _inputController.text;
    if (input.isEmpty) {
      setState(() {
        _output = '';
        _errorMessage = null;
      });
      return;
    }

    try {
      if (_isEncoding) {
        final bytes = utf8.encode(input);
        setState(() {
          _output = base64.encode(bytes);
          _errorMessage = null;
        });
      } else {
        final bytes = base64.decode(input);
        setState(() {
          _output = utf8.decode(bytes);
          _errorMessage = null;
        });
      }
    } catch (e) {
      setState(() {
        _output = '';
        _errorMessage = _isEncoding 
            ? 'Error encoding: ${e.toString()}'
            : 'Invalid Base64 string: ${e.toString()}';
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

  void _swapMode() {
    setState(() {
      _isEncoding = !_isEncoding;
      final temp = _inputController.text;
      _inputController.text = _output;
      _output = temp;
      _errorMessage = null;
    });
    _processText();
  }

  @override
  Widget build(BuildContext context) {
    return ToolLayout(
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings with UTF-8 support',
      child: Column(
        children: [
          // Mode Toggle
          Container(
            margin: const EdgeInsets.only(bottom: 20),
            child: SegmentedButton<bool>(
              segments: const [
                ButtonSegment(
                  value: true,
                  label: Text('Encode'),
                  icon: Icon(Icons.lock),
                ),
                ButtonSegment(
                  value: false,
                  label: Text('Decode'),
                  icon: Icon(Icons.lock_open),
                ),
              ],
              selected: {_isEncoding},
              onSelectionChanged: (Set<bool> selection) {
                setState(() {
                  _isEncoding = selection.first;
                });
                _processText();
              },
            ),
          ),
          
          InputOutputWidget(
            inputController: _inputController,
            inputLabel: _isEncoding ? 'Text to Encode' : 'Base64 to Decode',
            inputHint: _isEncoding 
                ? 'Enter text to encode to Base64...'
                : 'Enter Base64 string to decode...',
            output: _output,
            outputLabel: _isEncoding ? 'Base64 Encoded' : 'Decoded Text',
            errorMessage: _errorMessage,
            onInputChanged: (_) => _processText(),
            actions: [
              ElevatedButton.icon(
                onPressed: _processText,
                icon: Icon(_isEncoding ? Icons.lock : Icons.lock_open),
                label: Text(_isEncoding ? 'Encode' : 'Decode'),
              ),
              const SizedBox(width: 12),
              OutlinedButton.icon(
                onPressed: _swapMode,
                icon: const Icon(Icons.swap_vert),
                label: const Text('Swap'),
              ),
              const SizedBox(width: 12),
              OutlinedButton.icon(
                onPressed: _copyToClipboard,
                icon: const Icon(Icons.copy),
                label: const Text('Copy'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
