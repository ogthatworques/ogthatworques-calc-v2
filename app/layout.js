import './globals.css';

export const metadata = {
  title: 'OGthatWorques Pricing Calculator',
  description: 'Tap-style detailing quote calculator for OGthatWorques Auto & Truck Detailing.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}