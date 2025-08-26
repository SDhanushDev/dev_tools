import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class InputOutputWidget extends StatelessWidget {
  final TextEditingController inputController;
  final String inputLabel;
  final String inputHint;
  final String output;
  final String outputLabel;
  final String? errorMessage;
  final ValueChanged<String>? onInputChanged;
  final List<Widget> actions;
  final int maxLines;

  const InputOutputWidget({
    super.key,
    required this.inputController,
    required this.inputLabel,
    required this.inputHint,
    required this.output,
    required this.outputLabel,
    this.errorMessage,
    this.onInputChanged,
    this.actions = const [],
    this.maxLines = 10,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > 800;
        
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Actions Row
            if (actions.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(bottom: 20),
                child: Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: actions,
                ),
              ),
            
            // Input/Output Layout
            if (isWide)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: _buildInputSection(theme)),
                  const SizedBox(width: 20),
                  Expanded(child: _buildOutputSection(theme)),
                ],
              )
            else
              Column(
                children: [
                  _buildInputSection(theme),
                  const SizedBox(height: 20),
                  _buildOutputSection(theme),
                ],
              ),
          ],
        );
      },
    );
  }

  Widget _buildInputSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          inputLabel,
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
            controller: inputController,
            onChanged: onInputChanged,
            maxLines: maxLines,
            style: GoogleFonts.firaCode(fontSize: 14),
            decoration: InputDecoration(
              hintText: inputHint,
              hintStyle: GoogleFonts.firaCode(
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.all(16),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildOutputSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          outputLabel,
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          constraints: BoxConstraints(
            minHeight: maxLines * 24.0 + 32, // Approximate height
          ),
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: errorMessage != null
                  ? theme.colorScheme.error
                  : theme.colorScheme.outline.withOpacity(0.3),
            ),
          ),
          padding: const EdgeInsets.all(16),
          child: errorMessage != null
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.error_outline,
                          color: theme.colorScheme.error,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Error',
                          style: GoogleFonts.inter(
                            fontWeight: FontWeight.w600,
                            color: theme.colorScheme.error,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      errorMessage!,
                      style: GoogleFonts.firaCode(
                        fontSize: 14,
                        color: theme.colorScheme.error,
                      ),
                    ),
                  ],
                )
              : output.isEmpty
                  ? Text(
                      'Output will appear here...',
                      style: GoogleFonts.firaCode(
                        fontSize: 14,
                        color: theme.colorScheme.onSurface.withOpacity(0.5),
                      ),
                    )
                  : SelectableText(
                      output,
                      style: GoogleFonts.firaCode(
                        fontSize: 14,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
        ),
      ],
    );
  }
}
