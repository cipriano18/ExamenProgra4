import './ui/global.css';
import { montserrat } from './ui/fonts';

export const metadata = {
  title: 'FlowTasks',
  description: 'Tu centro de control para gestionar tareas con eficiencia y estilo.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon.png',
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
