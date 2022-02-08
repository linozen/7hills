import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            defer
            data-website-id="c53a4784-1f3e-42de-975a-4cb3e64655c4"
            src="https://umami.sevenhills-restaurant.de/umami.js"
          ></script>
        </body>
      </Html>
    );
  }
}
