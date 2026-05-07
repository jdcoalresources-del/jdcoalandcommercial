import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'JD COAL & COMMERCIAL | Premium Coal Supplier' },
      {
        name: 'description',
        content:
          'JD Coal & Commercial – Your trusted premium coal supplier. Steam Coal, Coking Coal, Pet Coke and more. Pan India delivery with quality assurance.',
      },
      { name: 'theme-color', content: '#0a0a0a' },
    ],
  }),
  shellComponent: RootDocument,
})

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919274223940?text=Hello%20JD%20Coal%20%26%20Commercial%2C%20I%20am%20interested%20in%20your%20coal%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.768-.48-2.508.997-.74 1.772-1.247 2.636-2.12 1.206-1.262 2.185-3.159 3.382-4.155 1.197-.996 2.764-.396 3.76.601.996.997 1.996 2.172.601 3.369-1.395 1.197-2.994 3.169-4.191 4.365-1.197 1.196-2.864 2.365-4.767 2.365z" />
      </svg>
    </a>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
        {children}
        <WhatsAppButton />
        <Scripts />
      </body>
    </html>
  )
}
