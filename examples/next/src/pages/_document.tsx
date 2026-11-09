import { getThemeInitScript } from '@ultraviolet/themes/v2'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Scaleway Open Source Component Library" name="description" />
          <meta content="Ultraviolet UI" property="og:title" />
          <meta content="Scaleway Open Source Component Library" property="og:description" />
          <meta content="website" property="og:type" />
          <meta content="https://ultraviolet.scaleway.com" property="og:url" />
          <meta content="en_US" property="og:local" />
          <meta content="https://ultraviolet.scaleway.com/social.png" property="og:image" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="Ultraviolet UI" name="twitter:title" />
          <meta content="Scaleway Open Source Component Library" name="twitter:description" />
          <meta content="https://ultraviolet.scaleway.com/social.png" name="twitter:image" />
          <link href="/favicon/favicon-lightdark.svg" rel="icon" type="image/svg+xml" />
          <link href="/favicon/favicon.ico" rel="icon" />
          <link href="/favicon/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <script
            dangerouslySetInnerHTML={{
              __html: getThemeInitScript({ storageKey: 'next-app-theme' }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
