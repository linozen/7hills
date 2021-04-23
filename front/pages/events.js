import Head from "next/head";
import { getEvent } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import BackToTop from "../components/back-to-top";
import FsLightbox from "fslightbox-react";
import { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Button from "../components/button";

export default function Events(props) {
  const { t } = useTranslation("common");

  // if toggler is updated when lightbox is closed it will open it
  // if toggler is updated when lightbox is opened it will close it
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    source: ""
  });

  function openLightboxOnSource(source) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      source: source
    });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Seven Hills Restaurant</title>
        </Head>
        <NavBar />
        <BackToTop />


        <div className="bg-rose-500">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 bg-rose-500 py-10 mx-7 lg:mx-12">

            <div className="bg-rose-500 lg:pt-2 -mx-1">
              <Gallery
                direction="row"
                margin={5}
                photos={props.photos}
                onClick={(event) => openLightboxOnSource(event.target.src)} />
            </div>

            <FsLightbox
              toggler={lightboxController.toggler}
              source={lightboxController.source}
              sources={props.sources}
            />

            <div className="text-blood-500 lg:px-10 mx-auto">
              <div className="uppercase text-left text-blood-500 text-5xl md:text-7xl pb-2">
                {props.title}
              </div>
              <div
                className="pb-3 markdown-events"
                dangerouslySetInnerHTML={{ __html: props.content }}
              />
              <div className="pb-12">
                <Button
                  title={t("DOWNLOAD PDF")}
                  link="/menu"
                />
              </div>
              <div className="lg:hidden text-3xl md:text-5xl pb-3">
                {t("What's expecting you")}
              </div>
            </div>

          </div>
        </div>

      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const baseUrl = process.env.STRAPI_API_URL;
  console.log("URLURLURL", baseUrl)
  const data = await getEvent();
  const sources = data.event.galleryImages.map((item) => baseUrl + item.url);
  const photos = data.event.galleryImages.map(item => {
    return {
      src: baseUrl + item.url,
      width: item.width,
      height: item.height
    }
  })
  const title = locale === "en" ? data.event.title_en : data.event.title_de;
  const content = await markdownToHtml(
    locale === "en" ? data.event.content_en : data.event.content_de
  );
  return {
    props: {
      title,
      content,
      sources,
      photos,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
