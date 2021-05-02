import { useEffect } from "react";
import "../styles/globals.css";
// animate on scroll
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// translation
import { appWithTranslation } from "next-i18next";
// nprogress
import NextNProgress from "nextjs-progressbar";
import { useRouter } from 'next/router';
// next-seo
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  const curRoute = useRouter().pathname;
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
      <DefaultSeo {...SEO} />
      <NextNProgress
        color='#dec580'
        startPosition={0.3}
        stopDelayMs={200}
        height="2"
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
