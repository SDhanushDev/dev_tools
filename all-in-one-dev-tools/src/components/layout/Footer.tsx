import Link from 'next/link';
import { Code, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                All-in-One Dev Tools
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Free online developer tools to boost your productivity. No registration required, 
              all tools work directly in your browser.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/json-formatter" className="text-gray-600 hover:text-blue-600 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/sha256-generator" className="text-gray-600 hover:text-blue-600 transition-colors">
                  SHA256 Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/base64-encoder" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Base64 Encoder
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator" className="text-gray-600 hover:text-blue-600 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/color-picker" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Color Picker
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} All-in-One Dev Tools. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              Made with ❤️ for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
