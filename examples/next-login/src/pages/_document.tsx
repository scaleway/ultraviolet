import Document, { Head, Html, Main, NextScript } from 'next/document'
import { jsonLdScriptProps } from 'react-schemaorg'
import type { CreativeWork } from 'schema-dts'

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf8" />
          <meta
            name="description"
            content="Scaleway Open Source Component Library"
          />
          <meta property="og:title" content="Ultraviolet UI" />
          <meta
            property="og:description"
            content="Scaleway Open Source Component Library"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ultraviolet.scaleway.com" />
          <meta property="og:local" content="en_US" />
          <meta
            property="og:image"
            content="https://ultraviolet.scaleway.com/social.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ultraviolet UI" />
          <meta
            name="twitter:description"
            content="Scaleway Open Source Component Library"
          />
          <meta
            name="twitter:image"
            content="https://ultraviolet.scaleway.com/social.png"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/favicon/favicon-lightdark.svg"
          />
          <link rel="icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon-180x180.png"
          />

          <script
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...jsonLdScriptProps<CreativeWork>({
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              author: {
                '@type': 'Organization',
                name: 'Scaleway',
              },
              dateCreated: '2020-12-10',
              description: 'A beautiful React UI library created by Scaleway.',
              keywords:
                'react, ui, styled-components, ui-components, scaleway, ui-library, reakit',
              name: 'Ultraviolet UI',
              url: 'https://ultraviolet.scaleway.com',
            })}
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
