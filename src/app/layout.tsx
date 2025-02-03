import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
