// app/layout.js
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Order Tracker</title>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
