import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import { headers } from 'next/headers';
import './globals.css';
import './typography.css';
import './images.css';
import { funnelConfig } from '../config/funnel';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Lazos con Mercedes',
  description: 'Descubre tu camino para crear lazos artesanales con Mercedes.',
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get('accept-language') || '';
  const languageCountry = acceptLanguage.match(/[-_]([A-Z]{2})\b/i)?.[1];
  const visitorCountry = (requestHeaders.get('x-vercel-ip-country') || languageCountry || '').toUpperCase();

  return (
    <html lang="es">
      <body className={nunitoSans.variable} data-visitor-country={visitorCountry}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${funnelConfig.analytics.ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${funnelConfig.analytics.ga4Id}', { send_page_view: false });`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1939958330006245');
fbq('track','PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1939958330006245&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
