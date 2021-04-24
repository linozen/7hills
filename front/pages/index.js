/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Button from "../components/button";
import Carousel from "nuka-carousel";

export default function Index() {
  const { t } = useTranslation("common");
  return (
    <>
      <Layout>
        <Head>
          <title>Seven Hills Restaurant</title>
        </Head>
        <div className="flex flex-col h-screen">
          <div className="relative w-full flex-initial">
            <NavBar />
          </div>
          {/* Autoplay slider */}
          <div className="border-t border-b border-gold-500 w-full h-full flex-1 overflow-hidden bg-olive-500">
            <Carousel
              autoplay={true}
              autoplayInterval={6000}
              speed={1200}
              pauseOnHover={true}
              renderBottomCenterControls={({ }) => null}
              defaultControlsConfig={{
                nextButtonText: ">",
                prevButtonText: "<",
                nextButtonClassName: "slider-control",
                prevButtonClassName: "slider-control",
              }}
              // wrapAround={true}
              // easing="easeCubicInOut"
              transitionMode="fade"
            >
              {/* Image slide with button on medium and small viewports */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Button title={t("BOOK A TABLE")} link="https:www.opentable.com/" />
                </div>
                <img className="object-cover h-full w-full" alt="trees" src="/forest.jpg" />
              </div>
              {/* Image slide with button on medium and small viewports */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div data-aos="fade-up">
                    <Button title={t("ORGANIZE EVENT")} link="https:www.opentable.com/" />
                  </div>
                </div>
                <img className="object-cover h-full w-full" alt="trees" src="/trees.jpg" loading="lazy" />
              </div>
              {/* Image slide with button on medium and small viewports */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div data-aos="fade-up">
                    <Button title={t("SEASONAL MENU")} link="https:www.opentable.com/" />
                  </div>
                </div>
                <img className="object-cover h-full w-full" alt="trees" src="/leaves.jpg" loading="lazy" />
              </div>
            </Carousel>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
