import Document, { Head, Html, Main, NextScript } from 'next/document'
import { jsonLdScriptProps } from 'react-schemaorg'
import type { CreativeWork } from 'schema-dts'

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  override render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf8" />
          <meta
            content="Scaleway Open Source Component Library"
            name="description"
          />
          <meta content="Ultraviolet UI" property="og:title" />
          <meta
            content="Scaleway Open Source Component Library"
            property="og:description"
          />
          <meta content="website" property="og:type" />
          <meta content="https://ultraviolet.scaleway.com" property="og:url" />
          <meta content="en_US" property="og:local" />
          <meta
            content="https://ultraviolet.scaleway.com/social.png"
            property="og:image"
          />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="Ultraviolet UI" name="twitter:title" />
          <meta
            content="Scaleway Open Source Component Library"
            name="twitter:description"
          />
          <meta
            content="https://ultraviolet.scaleway.com/social.png"
            name="twitter:image"
          />
          <link
            href="/favicon/favicon-lightdark.svg"
            rel="icon"
            type="image/svg+xml"
          />
          <link href="/favicon/favicon.ico" rel="icon" />
          <link
            href="/favicon/apple-touch-icon-180x180.png"
            rel="apple-touch-icon"
            sizes="180x180"
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
