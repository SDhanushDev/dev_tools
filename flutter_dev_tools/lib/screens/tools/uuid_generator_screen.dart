import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:uuid/uuid.dart';
import '../../widgets/tool_layout.dart';
import 'package:google_fonts/google_fonts.dart';

class UuidGeneratorScreen extends StatefulWidget {
  const UuidGeneratorScreen({super.key});

  @override
  State<UuidGeneratorScreen> createState() => _UuidGeneratorScreenState();
}

class _UuidGeneratorScreenState extends State<UuidGeneratorScreen> {
  final List<String> _generatedUuids = [];
  final Uuid _uuid = const Uuid();
  int _version = 4;
  int _count = 1;

  @override
  void initState() {
    super.initState();
    _generateUuids();
  }

  void _generateUuids() {
    setState(() {
      _generatedUuids.clear();
      for (int i = 0; i < _count; i++) {
        switch (_version) {
          case 1:
            _generatedUuids.add(_uuid.v1());
            break;
          case 4:
          default:
            _generatedUuids.add(_uuid.v4());
            break;
        }
      }
    });
  }

  void _copyToClipboard(String uuid) {
    Clipboard.setData(ClipboardData(text: uuid));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('UUID copied to clipboard!')),
    );
  }

  void _copyAllToClipboard() {
    final allUuids = _generatedUuids.join('\n');
    Clipboard.setData(ClipboardData(text: allUuids));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${_generatedUuids.length} UUIDs copied to clipboard!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ToolLayout(
      title: 'UUID Generator',
      description: 'Generate UUID/GUID identifiers with different versions and formats',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Options Section
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
                  'Generation Options',
                  style: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 16),
                
                // Version Selection
                Row(
                  children: [
                    Flexible(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'UUID Version',
                            style: GoogleFonts.inter(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          SegmentedButton<int>(
                            segments: const [
                              ButtonSegment(
                                value: 1,
                                label: Text('v1'),
                                tooltip: 'Time-based UUID',
                              ),
                              ButtonSegment(
                                value: 4,
                                label: Text('v4'),
                                tooltip: 'Random UUID',
                              ),
                            ],
                            selected: {_version},
                            onSelectionChanged: (Set<int> selection) {
                              setState(() {
                                _version = selection.first;
                              });
                              _generateUuids();
                            },
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 20),
                    Flexible(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Count',
                            style: GoogleFonts.inter(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Flexible(
                                child: Slider(
                                  value: _count.toDouble(),
                                  min: 1,
                                  max: 50,
                                  divisions: 49,
                                  label: _count.toString(),
                                  onChanged: (value) {
                                    setState(() {
                                      _count = value.round();
                                    });
                                  },
                                  onChangeEnd: (_) => _generateUuids(),
                                ),
                              ),
                              Container(
                                width: 40,
                                alignment: Alignment.center,
                                child: Text(
                                  '$_count',
                                  style: GoogleFonts.inter(
                                    fontWeight: FontWeight.w600,
                                    color: theme.colorScheme.primary,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 16),
                
                // Action Buttons
                Row(
                  children: [
                    ElevatedButton.icon(
                      onPressed: _generateUuids,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Generate New'),
                    ),
                    const SizedBox(width: 12),
                    if (_generatedUuids.length > 1)
                      OutlinedButton.icon(
                        onPressed: _copyAllToClipboard,
                        icon: const Icon(Icons.copy_all),
                        label: const Text('Copy All'),
                      ),
                  ],
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Generated UUIDs Section
          Text(
            'Generated UUIDs',
            style: GoogleFonts.inter(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          
          const SizedBox(height: 16),
          
          // UUID List
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withOpacity(0.3),
              ),
            ),
            child: Column(
              children: [
                if (_generatedUuids.isEmpty)
                  Padding(
                    padding: const EdgeInsets.all(40),
                    child: Text(
                      'No UUIDs generated yet',
                      style: GoogleFonts.inter(
                        color: theme.colorScheme.onSurface.withOpacity(0.5),
                      ),
                    ),
                  )
                else
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _generatedUuids.length,
                    separatorBuilder: (context, index) => Divider(
                      height: 1,
                      color: theme.colorScheme.outline.withOpacity(0.2),
                    ),
                    itemBuilder: (context, index) {
                      final uuid = _generatedUuids[index];
                      return ListTile(
                        title: SelectableText(
                          uuid,
                          style: GoogleFonts.firaCode(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.copy, size: 20),
                          onPressed: () => _copyToClipboard(uuid),
                          tooltip: 'Copy UUID',
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                      );
                    },
                  ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Info Section
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
                      'UUID Information',
                      style: GoogleFonts.inter(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  _version == 1
                      ? 'UUID v1: Time-based UUIDs that include timestamp and MAC address information. These are predictable but guarantee uniqueness across time and space.'
                      : 'UUID v4: Random UUIDs generated using cryptographically secure random numbers. These provide excellent uniqueness with no predictable information.',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Format: 8-4-4-4-12 hexadecimal digits (36 characters total including hyphens)',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
