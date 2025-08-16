import { metadata as siteMetadata } from '@/constants/appInfos';
import { Geist, Geist_Mono } from 'next/font/google';
import '../assets/style/globals.css';
import { Toaster } from 'sonner';
import ReactQueryProvider from './ReactQueryProvider';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scroll`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
        <Script id="add-mdl-class" strategy="afterInteractive">
          {`document.documentElement.classList.add('mdl-js');`}
        </Script>
      </body>
    </html>
  );
}
