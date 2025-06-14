import './ui/global.css';
import { montserrat } from './ui/fonts';

export const metadata = {
  title: 'FlowTasks',
  description: 'Tu centro de control para gestionar tareas con eficiencia y estilo.',
  themeColor: '#0f172a',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
