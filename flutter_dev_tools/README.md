# All-in-One Developer Tools

A comprehensive Flutter web application providing essential developer tools with a modern, responsive UI.

## Features

### Developer Tools
- **JSON Formatter** - Format, validate, and beautify JSON data
- **Regex Tester** - Test regular expressions with real-time matching
- **Markdown Previewer** - Live markdown rendering and preview
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings

### Security & Hashing
- **SHA256 Generator** - Generate SHA256 hashes
- **MD5 Generator** - Generate MD5 hashes
- **Password Generator** - Create secure passwords with customizable options
- **UUID Generator** - Generate UUID/GUID identifiers

### File Utilities
- **CSV to JSON Converter** - Convert CSV data to JSON format
- **Text Case Converter** - Convert between different text cases

### Design & Media
- **Color Picker** - Pick colors and get hex, RGB, HSL values
- **Gradient Generator** - Create CSS gradients with live preview
- **QR Code Generator** - Generate QR codes from text or URLs

### Productivity
- **Epoch Converter** - Convert between epoch time and human-readable dates

## Getting Started

### Prerequisites
- Flutter SDK (3.16.0 or later)
- Dart SDK
- Web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flutter_dev_tools
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Enable web support**
   ```bash
   flutter config --enable-web
   ```

4. **Run the application**
   ```bash
   flutter run -d chrome
   ```

### Building for Production

1. **Build the web application**
   ```bash
   flutter build web --release
   ```

2. **The built files will be in the `build/web` directory**

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions will automatically:**
   - Build the Flutter web app
   - Deploy to GitHub Pages
   - Make it available at `https://yourusername.github.io/dev_tools/`

### Manual Deployment

You can also deploy the `build/web` folder to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Any web server

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
├── providers/                # State management
├── data/                     # Static data and configurations
├── screens/                  # App screens
│   ├── home_screen.dart
│   └── tools/               # Individual tool screens
├── widgets/                 # Reusable UI components
└── utils/                   # Utilities and routing
```

## Technologies Used

- **Flutter** - UI framework
- **Material Design 3** - Design system
- **Google Fonts** - Typography
- **Provider** - State management
- **Various packages** for specific functionalities

## Features

- 🎨 **Modern UI** - Clean, responsive design with dark/light theme
- ⚡ **Fast Performance** - Optimized Flutter web application
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔧 **No Registration** - All tools work offline in your browser
- 🎯 **Developer Focused** - Built by developers, for developers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
