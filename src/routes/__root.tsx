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
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
  <circle cx="16" cy="16" r="16" fill="#25D366"/>
  <path d="M21.86 10.14a7.076 7.076 0 0 0-12.096 7.049L8 24l6.964-1.729a7.075 7.075 0 0 0 6.896-12.131zm-6.13 9.583-4.144 1.029 1.082-4.079a5.573 5.573 0 1 1 3.062 3.05zm4.036-2.011-.593.592c-.288.288-.587.315-.948.185-.815-.296-2.093-.913-3.164-2.069-.893-.92-1.423-1.741-1.734-2.309-.18-.324-.064-.627.19-.879l.589-.59a.674.674 0 0 1 .689-.182c.185.059.57.236.817.493.119.122.294.414.361.573.109.26.044.5-.088.681l-.268.37a.254.254 0 0 0 .037.327 7.124 7.124 0 0 0 1.42 1.429.25.25 0 0 0 .323.039l.336-.223a.707.707 0 0 1 .706-.093c.151.06.438.244.56.37.189.196.193.479.067.686z" fill="#fff"/>
</svg>
</a>
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
