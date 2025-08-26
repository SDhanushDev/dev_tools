import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../data/tools_data.dart';

class StatsSection extends StatelessWidget {
  const StatsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > 600;
        
        return Container(
          constraints: const BoxConstraints(maxWidth: 800),
          child: isWide
              ? Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: _buildStatItems(theme),
                )
              : Column(
                  children: _buildStatItems(theme)
                      .map((item) => Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: item,
                          ))
                      .toList(),
                ),
        );
      },
    );
  }

  List<Widget> _buildStatItems(ThemeData theme) {
    return [
      _StatItem(
        value: '${ToolsData.tools.length}+',
        label: 'Developer Tools',
        color: theme.colorScheme.primary,
      ),
      _StatItem(
        value: '100%',
        label: 'Free to Use',
        color: Colors.green,
      ),
      _StatItem(
        value: '0',
        label: 'Registration Required',
        color: Colors.orange,
      ),
    ];
  }
}

class _StatItem extends StatelessWidget {
  final String value;
  final String label;
  final Color color;

  const _StatItem({
    required this.value,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Column(
      children: [
        Text(
          value,
          style: GoogleFonts.inter(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: GoogleFonts.inter(
            fontSize: 14,
            color: theme.colorScheme.onSurface.withOpacity(0.7),
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
