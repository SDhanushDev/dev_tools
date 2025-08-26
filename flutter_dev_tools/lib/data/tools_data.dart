import 'package:flutter/material.dart';
import '../models/tool.dart';

class ToolsData {
  static const List<ToolCategory> categories = [
    ToolCategory(
      id: 'developer',
      name: 'Developer Tools',
      description: 'Essential tools for developers',
      icon: Icons.code,
      color: Color(0xFF2563EB),
    ),
    ToolCategory(
      id: 'security',
      name: 'Security & Hashing',
      description: 'Security and encryption tools',
      icon: Icons.security,
      color: Color(0xFF059669),
    ),
    ToolCategory(
      id: 'file-utilities',
      name: 'File Utilities',
      description: 'File processing and conversion tools',
      icon: Icons.description,
      color: Color(0xFFDC2626),
    ),
    ToolCategory(
      id: 'design',
      name: 'Design & Media',
      description: 'Design and media creation tools',
      icon: Icons.palette,
      color: Color(0xFF7C3AED),
    ),
    ToolCategory(
      id: 'productivity',
      name: 'Productivity',
      description: 'Productivity and utility tools',
      icon: Icons.flash_on,
      color: Color(0xFFEA580C),
    ),
  ];

  static const List<Tool> tools = [
    // Developer Tools
    Tool(
      id: 'json-formatter',
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      category: 'developer',
      route: '/tools/json-formatter',
      keywords: ['json', 'format', 'beautify', 'validate', 'pretty print'],
      icon: Icons.data_object,
      color: Color(0xFF2563EB),
    ),
    Tool(
      id: 'regex-tester',
      name: 'Regex Tester',
      description: 'Test and debug regular expressions with real-time matching',
      category: 'developer',
      route: '/tools/regex-tester',
      keywords: ['regex', 'regular expression', 'pattern', 'match', 'test'],
      icon: Icons.search,
      color: Color(0xFF2563EB),
    ),
    Tool(
      id: 'markdown-previewer',
      name: 'Markdown Previewer',
      description: 'Preview markdown content with live rendering',
      category: 'developer',
      route: '/tools/markdown-previewer',
      keywords: ['markdown', 'preview', 'md', 'render', 'documentation'],
      icon: Icons.preview,
      color: Color(0xFF2563EB),
    ),
    Tool(
      id: 'base64-encoder',
      name: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      category: 'developer',
      route: '/tools/base64-encoder',
      keywords: ['base64', 'encode', 'decode', 'encoding', 'conversion'],
      icon: Icons.transform,
      color: Color(0xFF2563EB),
    ),

    // Security & Hashing
    Tool(
      id: 'sha256-generator',
      name: 'SHA256 Hash Generator',
      description: 'Generate SHA256 hashes from text input',
      category: 'security',
      route: '/tools/sha256-generator',
      keywords: ['sha256', 'hash', 'checksum', 'security', 'encryption'],
      icon: Icons.tag,
      color: Color(0xFF059669),
    ),
    Tool(
      id: 'md5-generator',
      name: 'MD5 Hash Generator',
      description: 'Generate MD5 hashes from text input',
      category: 'security',
      route: '/tools/md5-generator',
      keywords: ['md5', 'hash', 'checksum', 'legacy', 'verification'],
      icon: Icons.tag,
      color: Color(0xFF059669),
    ),
    Tool(
      id: 'password-generator',
      name: 'Password Generator',
      description: 'Generate secure random passwords with customizable options',
      category: 'security',
      route: '/tools/password-generator',
      keywords: ['password', 'generate', 'random', 'secure', 'strength'],
      icon: Icons.key,
      color: Color(0xFF059669),
    ),
    Tool(
      id: 'uuid-generator',
      name: 'UUID Generator',
      description: 'Generate UUID/GUID identifiers',
      category: 'security',
      route: '/tools/uuid-generator',
      keywords: ['uuid', 'guid', 'identifier', 'unique', 'generate'],
      icon: Icons.fingerprint,
      color: Color(0xFF059669),
    ),

    // File Utilities
    Tool(
      id: 'csv-to-json',
      name: 'CSV to JSON Converter',
      description: 'Convert CSV data to JSON format',
      category: 'file-utilities',
      route: '/tools/csv-to-json',
      keywords: ['csv', 'json', 'convert', 'data', 'transformation'],
      icon: Icons.swap_horiz,
      color: Color(0xFFDC2626),
    ),
    Tool(
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text between different cases (camelCase, snake_case, etc.)',
      category: 'file-utilities',
      route: '/tools/text-case-converter',
      keywords: ['text', 'case', 'convert', 'camelcase', 'snake_case', 'kebab-case'],
      icon: Icons.text_fields,
      color: Color(0xFFDC2626),
    ),

    // Design & Media
    Tool(
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Pick colors and get hex, RGB, HSL values',
      category: 'design',
      route: '/tools/color-picker',
      keywords: ['color', 'picker', 'hex', 'rgb', 'hsl', 'palette'],
      icon: Icons.colorize,
      color: Color(0xFF7C3AED),
    ),
    Tool(
      id: 'gradient-generator',
      name: 'Gradient Generator',
      description: 'Create CSS gradients with live preview',
      category: 'design',
      route: '/tools/gradient-generator',
      keywords: ['gradient', 'css', 'linear', 'radial', 'background'],
      icon: Icons.gradient,
      color: Color(0xFF7C3AED),
    ),
    Tool(
      id: 'qr-code-generator',
      name: 'QR Code Generator',
      description: 'Generate QR codes from text or URLs',
      category: 'design',
      route: '/tools/qr-code-generator',
      keywords: ['qr', 'qr code', 'generate', 'barcode', 'url'],
      icon: Icons.qr_code,
      color: Color(0xFF7C3AED),
    ),

    // Productivity
    Tool(
      id: 'epoch-converter',
      name: 'Epoch Time Converter',
      description: 'Convert between epoch time and human-readable dates',
      category: 'productivity',
      route: '/tools/epoch-converter',
      keywords: ['epoch', 'unix', 'timestamp', 'date', 'time', 'convert'],
      icon: Icons.access_time,
      color: Color(0xFFEA580C),
    ),
  ];

  static List<Tool> getToolsByCategory(String categoryId) {
    return tools.where((tool) => tool.category == categoryId).toList();
  }

  static List<Tool> searchTools(String query) {
    final lowercaseQuery = query.toLowerCase();
    return tools.where((tool) {
      return tool.name.toLowerCase().contains(lowercaseQuery) ||
          tool.description.toLowerCase().contains(lowercaseQuery) ||
          tool.keywords.any((keyword) => keyword.toLowerCase().contains(lowercaseQuery));
    }).toList();
  }

  static Tool? getToolById(String id) {
    try {
      return tools.firstWhere((tool) => tool.id == id);
    } catch (e) {
      return null;
    }
  }

  static ToolCategory? getCategoryById(String id) {
    try {
      return categories.firstWhere((category) => category.id == id);
    } catch (e) {
      return null;
    }
  }
}
