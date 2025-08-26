import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:csv/csv.dart';
import 'dart:convert';
import '../../widgets/tool_layout.dart';
import '../../widgets/input_output_widget.dart';

class CsvToJsonScreen extends StatefulWidget {
  const CsvToJsonScreen({super.key});

  @override
  State<CsvToJsonScreen> createState() => _CsvToJsonScreenState();
}

class _CsvToJsonScreenState extends State<CsvToJsonScreen> {
  final TextEditingController _inputController = TextEditingController();
  String _output = '';
  String? _errorMessage;
  bool _hasHeaders = true;
  String _delimiter = ',';

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _convertCsvToJson() {
    final input = _inputController.text.trim();
    if (input.isEmpty) {
      setState(() {
        _output = '';
        _errorMessage = null;
      });
      return;
    }

    try {
      final csvData = const CsvToListConverter().convert(
        input,
        fieldDelimiter: _delimiter,
      );

      if (csvData.isEmpty) {
        setState(() {
          _output = '';
          _errorMessage = 'No data found in CSV';
        });
        return;
      }

      List<Map<String, dynamic>> jsonData = [];

      if (_hasHeaders && csvData.length > 1) {
        final headers = csvData[0].map((e) => e.toString()).toList();
        
        for (int i = 1; i < csvData.length; i++) {
          final row = csvData[i];
          final Map<String, dynamic> jsonRow = {};
          
          for (int j = 0; j < headers.length && j < row.length; j++) {
            jsonRow[headers[j]] = row[j];
          }
          jsonData.add(jsonRow);
        }
      } else {
        for (final row in csvData) {
          final Map<String, dynamic> jsonRow = {};
          for (int i = 0; i < row.length; i++) {
            jsonRow['column_$i'] = row[i];
          }
          jsonData.add(jsonRow);
        }
      }

      final encoder = JsonEncoder.withIndent('  ');
      setState(() {
        _output = encoder.convert(jsonData);
        _errorMessage = null;
      });
    } catch (e) {
      setState(() {
        _output = '';
        _errorMessage = 'Error converting CSV: ${e.toString()}';
      });
    }
  }

  void _copyToClipboard() {
    if (_output.isNotEmpty) {
      Clipboard.setData(ClipboardData(text: _output));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('JSON copied to clipboard!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'CSV to JSON Converter',
      description: 'Convert CSV data to JSON format with customizable options',
      child: Column(
        children: [
          // Options
          Container(
            margin: const EdgeInsets.only(bottom: 20),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.2),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: CheckboxListTile(
                    title: const Text('First row contains headers'),
                    value: _hasHeaders,
                    onChanged: (value) {
                      setState(() {
                        _hasHeaders = value ?? true;
                      });
                      _convertCsvToJson();
                    },
                    contentPadding: EdgeInsets.zero,
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _delimiter,
                    decoration: const InputDecoration(
                      labelText: 'Delimiter',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: ',', child: Text('Comma (,)')),
                      DropdownMenuItem(value: ';', child: Text('Semicolon (;)')),
                      DropdownMenuItem(value: '\t', child: Text('Tab')),
                      DropdownMenuItem(value: '|', child: Text('Pipe (|)')),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _delimiter = value ?? ',';
                      });
                      _convertCsvToJson();
                    },
                  ),
                ),
              ],
            ),
          ),
          
          InputOutputWidget(
            inputController: _inputController,
            inputLabel: 'CSV Input',
            inputHint: 'Paste your CSV data here...\n\nExample:\nName,Age,City\nJohn,25,New York\nJane,30,London',
            output: _output,
            outputLabel: 'JSON Output',
            errorMessage: _errorMessage,
            onInputChanged: (_) => _convertCsvToJson(),
            maxLines: 12,
            actions: [
              ElevatedButton.icon(
                onPressed: _convertCsvToJson,
                icon: const Icon(Icons.transform),
                label: const Text('Convert'),
              ),
              const SizedBox(width: 12),
              OutlinedButton.icon(
                onPressed: _copyToClipboard,
                icon: const Icon(Icons.copy),
                label: const Text('Copy JSON'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
