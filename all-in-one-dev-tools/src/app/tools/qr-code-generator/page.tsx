import { Metadata } from 'next';
import { QrCodeGeneratorTool } from '@/components/tools/QrCodeGeneratorTool';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create QR Codes Online',
  description: 'Free online QR code generator. Create QR codes from text, URLs, phone numbers, and more. Customizable size and error correction.',
  keywords: ['qr code generator', 'qr code creator', 'generate qr code', 'qr code maker', 'barcode generator'],
  openGraph: {
    title: 'QR Code Generator - Create QR Codes Online',
    description: 'Free online QR code generator. Create QR codes from text, URLs, and more with customizable options.',
    type: 'website',
  },
};

export default function QrCodeGeneratorPage() {
  return <QrCodeGeneratorTool />;
}
