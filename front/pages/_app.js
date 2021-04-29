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

function MyApp({ Component, pageProps }) {
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
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
      <NextNProgress
        color='#dec580'
        startPosition={0.3}
        stopDelayMs={200}
        height="1"
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
