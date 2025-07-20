export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Order Tracker</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
