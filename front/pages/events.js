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
import ReactMarkdown from 'react-markdown';

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


        <div className="bg-blue-dark lg:px-48">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 bg-blue-dark py-10 mx-8">

            <div className="bg-blue-dark lg:pt-2 -mx-1">
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

            <div className="lg:hidden text-gold-500 text-3xl md:text-5xl pb-3">
              {t("What's expecting you")}
            </div>

            <div className="text-left mx-auto md:px-12 lg:px-0 lg:ml-8 prose md:prose-lg text-gold-500 pt-2">
              <ReactMarkdown>
                {props.content}
              </ReactMarkdown>
              <div className="pb-12">
                <Button
                  title={t("DOWNLOAD PDF")}
                  link="/menu"
                />
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
  const content = locale === "en" ? data.event.content_en : data.event.content_de;
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
