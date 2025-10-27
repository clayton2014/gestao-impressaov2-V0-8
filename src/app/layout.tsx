import Script from "next/script";
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'Gráfica Digital Pro', template: '%s | Gráfica Digital Pro' },
  description: 'Sistema completo para gestão de gráfica digital',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script id="theme-no-flash" strategy="beforeInteractive">{`
          (function() {
            try {
              var t = localStorage.getItem('theme');
              var m = window.matchMedia('(prefers-color-scheme: dark)');
              if (t === 'dark' || (!t && m.matches)) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch(e) {}
          })();
        `}</Script>
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-3 py-2 rounded">Pular para conteúdo</a>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}