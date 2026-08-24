import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lazos con Mercedes',
  description: 'Descubre tu camino para crear lazos artesanales con Mercedes.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
