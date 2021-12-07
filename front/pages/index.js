/* eslint-disable react/react-in-jsx-scope */
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getIndex } from "../lib/api";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Button from "../components/button";
import ButtonReservation from "../components/button-reservation";
import { NextSeo } from "next-seo";
import { CMS_URL } from "../lib/api";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

export default function Index(props) {
  const { t } = useTranslation("common");
  const swiperSlides = props.slider.map(function (item, index) {
    return (
      <SwiperSlide>
        <div>
          {index % 2 == 0 ? (
            <div className="absolute z-10 h-full w-full flex justify-center items-center pt-48">
              <ButtonReservation title={t("BOOK TABLE")} />
            </div>
          ) : (
            <div className="absolute z-10 h-full w-full flex justify-center items-center pt-48">
              <Button title={t("BOOK EVENTS")} link="events" />
            </div>
          )}
          <Image
            className="object-cover"
            src={`${CMS_URL}${item.url}`}
            alt={item.alternativeText}
            layout="fill"
            priority={index == 0 ? true : false}
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <>
      <NextSeo
        description={props.description}
        additionalMetaTags={[
          {
            name: "keywords",
            content: props.keywords,
          },
        ]}
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
            <Swiper
              navigation={true}
              pagination={{
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
              loop={true}
              effect={"fade"}
              lazy={{
                loadPrevNext: true,
              }}
            >
              {swiperSlides}
            </Swiper>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getIndex();

  const description =
    locale === "en"
      ? data.index.SEO.metaDescription_en
      : data.index.SEO.metaDescription_de;

  const keywords =
    locale === "en" ? data.index.SEO.keywords_en : data.index.SEO.keywords_de;

  const slider = data.index.slider;
  return {
    props: {
      description,
      keywords,
      slider,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 120,
  };
}
