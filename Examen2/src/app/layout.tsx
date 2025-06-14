import { montserrat } from './ui/fonts';
import './ui/global.css';
import Head from 'next/head'; // Importar Head

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
