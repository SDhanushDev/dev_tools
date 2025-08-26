interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "All-in-One Dev Tools",
    "description": "Free online developer tools including JSON formatter, hash generators, text converters, and more. No registration required.",
    "url": "https://all-in-one-dev-tools.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://all-in-one-dev-tools.vercel.app/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "All-in-One Dev Tools",
      "url": "https://all-in-one-dev-tools.vercel.app"
    }
  };

  return <JsonLd data={data} />;
}

export function ToolJsonLd({ 
  name, 
  description, 
  url 
}: { 
  name: string; 
  description: string; 
  url: string; 
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "All-in-One Dev Tools",
      "url": "https://all-in-one-dev-tools.vercel.app"
    }
  };

  return <JsonLd data={data} />;
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "All-in-One Dev Tools",
    "url": "https://all-in-one-dev-tools.vercel.app",
    "description": "Free online developer tools platform providing essential utilities for developers, designers, and digital professionals.",
    "foundingDate": "2024",
    "knowsAbout": [
      "Web Development",
      "Software Development",
      "JSON",
      "Regular Expressions",
      "Cryptography",
      "Color Theory",
      "QR Codes",
      "Base64 Encoding"
    ],
    "serviceType": "Developer Tools",
    "areaServed": "Worldwide"
  };

  return <JsonLd data={data} />;
}
