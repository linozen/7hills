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
import ButtonScroll from "../components/button-scroll";

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

        {/* Content starts here */}
        <div className="flex flex-col h-screen">

          {/* NavBar and BackToTop */}
          <div className="w-full flex-initial">
            <NavBar />
          </div>
          <BackToTop />


          {/* Image with title */}
          <div className="border-t border-b border-gold-500 relative bg-blue-dark flex-1 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <div className="uppercase absolute h-full w-full flex flex-col items-center justify-around pt-32">
                <div className="bg-blue-dark py-2 md:px-4 w-full text-center border-b border-t md:border md:max-w-max border-gold-500 bg-opacity-70 backdrop-filter backdrop-blur-md shadow-2xl">
                  <span className="text-5xl md:text-6xl shimmer">
                    {props.title}
                  </span>
                </div>
                <ButtonScroll link="content" />
              </div>
              <img className="object-cover h-full w-full" alt="events" src="/events_04.jpg" />
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div id="content" className="w-full bg-blue-dark pt-12">
          <div className="prose prose-lg md:prose-xl text-gold-500 px-5 mx-auto">
            <ReactMarkdown>
              {props.content}
            </ReactMarkdown>
            <Button
              title={t("DOWNLOAD PDF")}
              link={props.pdfUrl}
            />
          </div>
        </div>

        {/* Masonry Gallery  */}
        <div className="bg-blue-dark">
          <h2 className="mx-5 uppercase bg-blue-dark pt-20 pb-4 text-gold-500 text-3xl md:text-4xl">
            {t("What's expecting you")}
          </h2>
          <div className="mx-4">
            <Gallery
              direction="row"
              margin={5}
              photos={props.photos}
              limitNodeSearch={3}
              onClick={(event) => openLightboxOnSource(event.target.src)} />
          </div>
          <FsLightbox
            toggler={lightboxController.toggler}
            source={lightboxController.source}
            sources={props.sources}
          />
        </div>




      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const baseUrl = process.env.STRAPI_API_URL;
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
  const pdfUrl = locale === "en" ? baseUrl + data.event.pdf_en.url : baseUrl + data.event.pdf_de.url;
  return {
    props: {
      title,
      content,
      pdfUrl,
      sources,
      photos,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
