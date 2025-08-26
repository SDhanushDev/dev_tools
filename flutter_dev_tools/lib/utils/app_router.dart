import 'package:flutter/material.dart';
import '../screens/home_screen.dart';
import '../screens/tools/json_formatter_screen.dart';
import '../screens/tools/regex_tester_screen.dart';
import '../screens/tools/markdown_previewer_screen.dart';
import '../screens/tools/base64_encoder_screen.dart';
import '../screens/tools/sha256_generator_screen.dart';
import '../screens/tools/md5_generator_screen.dart';
import '../screens/tools/password_generator_screen.dart';
import '../screens/tools/uuid_generator_screen.dart';
import '../screens/tools/csv_to_json_screen.dart';
import '../screens/tools/text_case_converter_screen.dart';
import '../screens/tools/color_picker_screen.dart';
import '../screens/tools/gradient_generator_screen.dart';
import '../screens/tools/qr_code_generator_screen.dart';
import '../screens/tools/epoch_converter_screen.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const HomeScreen());
      case '/tools/json-formatter':
        return MaterialPageRoute(builder: (_) => const JsonFormatterScreen());
      case '/tools/regex-tester':
        return MaterialPageRoute(builder: (_) => const RegexTesterScreen());
      case '/tools/markdown-previewer':
        return MaterialPageRoute(builder: (_) => const MarkdownPreviewerScreen());
      case '/tools/base64-encoder':
        return MaterialPageRoute(builder: (_) => const Base64EncoderScreen());
      case '/tools/sha256-generator':
        return MaterialPageRoute(builder: (_) => const Sha256GeneratorScreen());
      case '/tools/md5-generator':
        return MaterialPageRoute(builder: (_) => const Md5GeneratorScreen());
      case '/tools/password-generator':
        return MaterialPageRoute(builder: (_) => const PasswordGeneratorScreen());
      case '/tools/uuid-generator':
        return MaterialPageRoute(builder: (_) => const UuidGeneratorScreen());
      case '/tools/csv-to-json':
        return MaterialPageRoute(builder: (_) => const CsvToJsonScreen());
      case '/tools/text-case-converter':
        return MaterialPageRoute(builder: (_) => const TextCaseConverterScreen());
      case '/tools/color-picker':
        return MaterialPageRoute(builder: (_) => const ColorPickerScreen());
      case '/tools/gradient-generator':
        return MaterialPageRoute(builder: (_) => const GradientGeneratorScreen());
      case '/tools/qr-code-generator':
        return MaterialPageRoute(builder: (_) => const QrCodeGeneratorScreen());
      case '/tools/epoch-converter':
        return MaterialPageRoute(builder: (_) => const EpochConverterScreen());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            appBar: AppBar(title: const Text('Page Not Found')),
            body: const Center(
              child: Text('404 - Page Not Found'),
            ),
          ),
        );
    }
  }
}
