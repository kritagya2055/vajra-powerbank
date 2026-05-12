import { Bebas_Neue, Rajdhani } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Vajra PowerBank — Charge Like Thunder',
  description:
    'Nepal ko premium powerbank. 20,000mAh, 65W fast charging, aerospace-grade aluminum. Named after the sacred thunderbolt of the Himalayas.',
  keywords: 'powerbank, nepal, vajra, fast charging, 20000mah, premium powerbank nepal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${rajdhani.variable}`}>
      <body className="bg-vajra-black text-vajra-light font-body antialiased">
        {children}
      </body>
    </html>
  );
}
