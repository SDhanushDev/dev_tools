# All-in-One Dev Tools

A comprehensive collection of free online developer tools built with Next.js, TypeScript, and TailwindCSS. This platform provides essential utilities for developers, designers, and digital professionals.

## 🚀 Features

### Developer Tools
- **JSON Formatter** - Format, validate, and beautify JSON data
- **Regex Tester** - Test regular expressions with real-time matching
- **Base64 Encoder/Decoder** - Convert between text and Base64
- **Markdown Previewer** - Preview markdown content (coming soon)

### Security & Hashing
- **SHA256 Generator** - Generate SHA256 hashes
- **Password Generator** - Create secure random passwords
- **UUID Generator** - Generate unique identifiers
- **MD5 Generator** - Generate MD5 hashes (coming soon)

### Design & Media
- **Color Picker** - Pick colors and get hex, RGB, HSL values
- **QR Code Generator** - Create QR codes from text or URLs
- **Gradient Generator** - Create CSS gradients (coming soon)

### File Utilities
- **CSV to JSON Converter** - Convert CSV data to JSON (coming soon)
- **Text Case Converter** - Convert between different text cases (coming soon)

## 🛠 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/all-in-one-dev-tools.git
cd all-in-one-dev-tools
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project and deploy
4. Set up environment variables (if needed)

### GitHub Actions Setup

1. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Your Vercel token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

2. Push to `main` branch for preview deployments
3. Push to `live` branch for production deployments

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── tools/             # Tool pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── tools/            # Tool components
│   ├── ads/              # Ad components
│   └── seo/              # SEO components
└── lib/                  # Utility functions
    ├── tools.ts          # Tool definitions
    └── utils.ts          # Helper functions
```

## 🎨 Adding New Tools

1. Add tool definition to `src/lib/tools.ts`
2. Create tool page in `src/app/tools/[tool-name]/page.tsx`
3. Create tool component in `src/components/tools/`
4. Update sitemap and navigation as needed

Example tool structure:
```typescript
// src/lib/tools.ts
{
  id: 'my-tool',
  name: 'My Tool',
  description: 'Tool description',
  category: 'developer',
  path: '/tools/my-tool',
  keywords: ['keyword1', 'keyword2'],
  icon: 'IconName',
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:
```env
# Add any environment variables here
```

### Google AdSense

Update the AdSense client ID in:
- `src/app/layout.tsx`
- `src/components/ads/AdBanner.tsx`

## 📈 SEO Features

- Dynamic meta tags for each tool
- Automatic sitemap.xml generation
- JSON-LD structured data
- OpenGraph and Twitter Card support
- Robots.txt configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tool`
3. Commit your changes: `git commit -am 'Add new tool'`
4. Push to the branch: `git push origin feature/new-tool`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All the open-source libraries used in this project

---

Made with ❤️ for the developer community
