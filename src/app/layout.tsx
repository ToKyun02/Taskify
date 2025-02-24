import { Montserrat } from 'next/font/google';
import { DialogContainer } from '@/components/ui/Modal/DialogContainer';
import QueryClientProvider from '@/components/provider/QueryProvider';
import './globals.css';

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat',
  preload: true,
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='stylesheet' as='style' crossOrigin='anonymous' href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css' />
      </head>
      <body className={`${montserrat.variable}`}>
        <QueryClientProvider>
          {children}
          <DialogContainer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
