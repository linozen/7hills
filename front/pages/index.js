/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getIndex } from '../lib/api';
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Button from "../components/button";
import Carousel from "nuka-carousel";
import { NextSeo } from 'next-seo';

export default function Index(props) {
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo
        description={props.description}
        additionalMetaTags={[{
          name: 'keywords',
          content: props.keywords
        }]}
        openGraph={{
          description: props.description,
        }}
      />
      <Layout>
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
                  <Button title={t("BOOK TABLE")} link="https://www.opentable.de/restref/client/?restref=248958&lang=de-DE&ot_source=Restaurant%20website&corrid=b92b7fc3-8dab-4563-8edd-464ff717eb79" />
                </div>
                <img
                  className="object-cover h-full w-full" alt="forest"
                  src="/small_forest.jpg"
                  srcSet="medium_forest.jpg 800w, large_forest.jpg 1920w"
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
                  srcSet="medium_events_13.jpg 800w, large_events_13.jpg 1920w"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getIndex();

  const description = locale === 'en' ?
    data.index.SEO.metaDescription_en :
    data.index.SEO.metaDescription_de

  const keywords = locale === 'en' ?
    data.index.SEO.keywords_en :
    data.index.SEO.keywords_de

  return {
    props: {
      description,
      keywords,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
};
