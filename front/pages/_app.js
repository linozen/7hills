import { useEffect } from "react";
import "../styles/globals.css";
// animate on scroll
import AOS from "aos";
import "aos/dist/aos.css";
// translation
import { appWithTranslation } from "next-i18next";
// nprogress
import NextNProgress from "nextjs-progressbar";
// next-seo
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import SimpleReactLightbox from "simple-react-lightbox";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 750,
      easing: "ease-out-quart",
    });
  });
  return (
    <>
      <SimpleReactLightbox>
        <DefaultSeo {...SEO} />
        <NextNProgress
          color="#dec580"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
        />
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </>
  );
}

export default appWithTranslation(MyApp);
