import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async defer
            data-website-id="5610f70f-62e0-40b6-bfff-4ae5f3f97c6d"
            src="https://umami.sevenhills-restaurant.de/umami.js"></script>
        </body>
      </Html>
    )
  }
}
