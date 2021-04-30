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
              // easing="easeCubicInOut"
              transitionMode="fade"
              wrapAround={true}
            >

              {/* Image slide with button on medium and small viewports */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute h-full w-full flex justify-center items-center pt-48">
                  <Button title={t("BOOK TABLE")} link="https:www.opentable.com/" />
                </div>
                <img
                  className="object-cover h-full w-full" alt="forest"
                  src="/small_forest.jpg"
                  srcset="medium_forest.jpg 800w, large_forest.jpg 1920w"
                />
              </div>

              {/* Image slide with button on medium and small viewports */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute h-full w-full flex justify-center items-center pt-48">
                  <Button title={t("BOOK EVENT")} link="/events" />
                </div>
                <img
                  className="object-cover h-full w-full" alt="forest"
                  src="/small_events_13.jpg"
                  srcset="medium_events_13.jpg 800w, large_events_13.jpg 1920w"
                />
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
