import 'package:flutter/material.dart';

class Tool {
  final String id;
  final String name;
  final String description;
  final String category;
  final String route;
  final List<String> keywords;
  final IconData icon;
  final Color color;

  const Tool({
    required this.id,
    required this.name,
    required this.description,
    required this.category,
    required this.route,
    required this.keywords,
    required this.icon,
    required this.color,
  });
}

class ToolCategory {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  final Color color;

  const ToolCategory({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.color,
  });
}
