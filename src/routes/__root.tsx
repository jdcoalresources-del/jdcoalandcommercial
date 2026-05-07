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
