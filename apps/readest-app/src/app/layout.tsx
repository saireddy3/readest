import * as React from 'react';
import Providers from '@/components/Providers';

import '../styles/globals.css';
import '../styles/fonts.css';

const url = 'https://web.readest.com/';
const title = 'Direct Book Reader';
const description =
  'A simplified Readest direct reader for viewing EPUB books from URLs without library management.';
const previewImage = 'https://cdn.readest.com/images/open_graph_preview_read_now.png';

export const metadata = {
  title,
  description,
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['epub', 'pdf', 'ebook', 'reader', 'readest', 'pwa'],
  authors: [
    {
      name: 'readest',
      url: 'https://github.com/readest/readest',
    },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', url: '/icon.png' },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: 'white',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Direct Reader' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='description' content={description} />
        <meta property='og:url' content={url} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={previewImage} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='web.readest.com' />
        <meta property='twitter:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={previewImage} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
