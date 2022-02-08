// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// API
import { CMS_URL, fetchItems } from "../lib/api";

// SEO
import { NextSeo } from "next-seo";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
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

// Components
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Image from "next/image";
import Button from "../components/button";
import ButtonReservation from "../components/button-reservation";

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

export default function Index(props) {
  const { t } = useTranslation("common");
  const swiperSlides = props.files.map(function (item, index) {
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
            src={`${CMS_URL}/assets/${item.directus_files_id}`}
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
                delay: 5000,
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
  // Get data from CMS
  const files = await fetchItems("Homepage_files");
  const trans = await fetchItems("Homepage_translations");

  // Get texts by locale
  const de = trans.filter((obj) => {
    return obj.languages_code === "de-DE";
  });
  const en = trans.filter((obj) => {
    return obj.languages_code === "en-US";
  });
  const description = locale === "en" ? en[0].description : de[0].description;

  return {
    props: {
      files,
      description,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
