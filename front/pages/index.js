/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import Carousel from "nuka-carousel";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Button from "../components/button";

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
          <div className="w-full h-full flex-1 overflow-hidden">
            <Carousel
              autoplay={true}
              autoplayInterval={6000}
              speed={1200}
              pauseOnHover={true}
              renderBottomCenterControls={({ currentSlide }) => null}
              defaultControlsConfig={{
                nextButtonText: ">",
                prevButtonText: "<",
                nextButtonClassName: "slider-control",
                prevButtonClassName: "slider-control",
              }}
            // wrapAround={true}
            // transitionMode="fade"
            >
              {/* Image slide with button on medium and small viewports */}
              <div className="h-full">
                <div className="container mx-auto table relative z-10 h-full">
                  <div className="lg:hidden text-center table-cell align-middle">
                    <Button
                      title={t("BOOK A TABLE")}
                      link="/menu"
                      className="order-1"
                    />
                  </div>
                </div>
                <Image
                  src="/trees.png"
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                  priority={true}
                  loading="eager"
                />
              </div>
              {/* Image slide */}
              <Image
                src="/trees2.png"
                layout="fill"
                objectFit="cover"
                className="object-center"
                priority={true}
              />
              {/* Image slide */}
              <Image
                src="/leaves.png"
                layout="fill"
                objectFit="cover"
                className="object-center"
                priority={true}
              />
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
