import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <script */}
          {/*   async defer */}
          {/*   data-website-id="a2e2d500-a5e2-4a24-8389-46d15f8411be" */}
          {/*   src="https://umami.sehn.dev/umami.js"></script> */}
        </body>
      </Html>
    );
  }
}
