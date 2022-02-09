// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// API
import { CMS_URL, fetchItems } from "../lib/api";

// SEO
import { NextSeo } from "next-seo";

// Components
import BackToTop from "../components/back-to-top";
import Button from "../components/button";
import ButtonScroll from "../components/button-scroll";
import Image from "next/image";
import Layout from "../components/layout";
import Masonry from "react-masonry-css";
import NavBar from "../components/navbar";
import ReactMarkdown from "react-markdown";
import { SRLWrapper } from "simple-react-lightbox";

export default function Events(props) {
  const { t } = useTranslation("common");

  const photos = props.gallery.map(function (item, index) {
    return (
      <div key={index} className="pb-4">
        <img
          className="cursor-pointer"
          src={item.src}
          width={item.width}
          height={item.height}
        />
      </div>
    );
  });

  const masonryBreakpoints = {
    default: 4,
    1120: 3,
    796: 2,
    640: 1,
  };

  return (
    <>
      <NextSeo
        title={props.title}
        titleTemplate="%s | Seven Hills Restaurant"
        description={props.description}
        openGraph={{
          description: props.description,
        }}
      />

      <Layout>
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
              <img
                className="object-cover h-full w-full"
                alt="events"
                src="/events_04.jpg"
              />
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div id="content" className="w-full bg-blue-dark pt-12">
          <div className="prose prose-lg md:prose-xl break-words text-gold-500 px-5 mx-auto">
            <ReactMarkdown>{props.content}</ReactMarkdown>
            <Button title={t("DOWNLOAD PDF")} link={props.pdfUrl} />
          </div>
        </div>

        {/* Masonry Gallery  */}
        <SRLWrapper elements={photos}>
          <div className="bg-blue-dark">
            <h2 className="mx-5 uppercase bg-blue-dark pt-20 pb-4 text-gold-500 text-3xl md:text-4xl">
              {t("What's expecting you")}
            </h2>
            <div>
              <Masonry
                breakpointCols={masonryBreakpoints}
                className="px-5 my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {photos}
              </Masonry>
            </div>
          </div>
        </SRLWrapper>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Get data from CMS
  const events = await fetchItems("Events");
  const eventsTrans = await fetchItems("Events_translations");
  const eventsFiles = await fetchItems("Events_files");
  const allFiles = await fetchItems("directus_files");

  // Get page texts by locale
  const eventsDe = eventsTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });
  const eventsEn = eventsTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const title = locale === "en" ? eventsEn[0].title : eventsDe[0].title;
  const content = locale === "en" ? eventsEn[0].content : eventsDe[0].content;
  const description =
    locale === "en" ? eventsEn[0].description : eventsDe[0].description;
  const pdfUrl =
    locale === "en"
      ? `${CMS_URL}/assets/${eventsEn[0].pdf}`
      : `${CMS_URL}/assets/${eventsDe[0].pdf}`;

  const galleryUnfiltered = eventsFiles.map((value, index) => {
    let width = allFiles
      .filter((item) => item.id === value.directus_files_id)
      .map((item) => item.width);
    let height = allFiles
      .filter((item) => item.id === value.directus_files_id)
      .map((item) => item.height);
    return {
      src: `${CMS_URL}/assets/${value.directus_files_id}`,
      width: width[0],
      height: height[0],
    };
  });

  const gallery = galleryUnfiltered.filter((item) => {
    return item.src !== `${CMS_URL}/assets/null`;
  });

  return {
    props: {
      title,
      content,
      description,
      pdfUrl,
      gallery,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
