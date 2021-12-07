import { getEvent } from "../lib/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import BackToTop from "../components/back-to-top";
import Button from "../components/button";
import ReactMarkdown from "react-markdown";
import ButtonScroll from "../components/button-scroll";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { SRLWrapper } from "simple-react-lightbox";

export default function Events(props) {
  const { t } = useTranslation("common");

  const photos = props.photos.map(function (item, index) {
    return (
      <div key={index} className="pb-2">
        <Image
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
        additionalMetaTags={[
          {
            name: "keywords",
            content: props.keywords,
          },
        ]}
        openGraph={{
          description: props.description,
          images: [
            {
              url: props.shareImage.media.url,
              alt: props.shareImage.alt,
            },
          ],
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
          <div className="prose prose-lg md:prose-xl text-gold-500 px-5 mx-auto">
            <ReactMarkdown>{props.content}</ReactMarkdown>
            <Button title={t("DOWNLOAD PDF")} link={props.pdfUrl} />
          </div>
        </div>

        {/* Masonry Gallery  */}
        <div className="bg-blue-dark">
          <h2 className="mx-5 uppercase bg-blue-dark pt-20 pb-4 text-gold-500 text-3xl md:text-4xl">
            {t("What's expecting you")}
          </h2>
          <div>
            <SRLWrapper>
              <Masonry
                breakpointCols={masonryBreakpoints}
                className="px-5 my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {photos}
              </Masonry>
            </SRLWrapper>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const cmsURL = process.env.CMS_URL;
  const data = await getEvent();

  const description =
    locale === "en"
      ? data.event.SEO.metaDescription_en
      : data.event.SEO.metaDescription_de;

  const keywords =
    locale === "en" ? data.event.SEO.keywords_en : data.event.SEO.keywords_de;

  const photos = data.event.galleryImages.map((item) => {
    return {
      src: cmsURL + item.url,
      width: item.width,
      height: item.height,
    };
  });
  const title = locale === "en" ? data.event.title_en : data.event.title_de;
  const content =
    locale === "en" ? data.event.content_en : data.event.content_de;
  const pdfUrl =
    locale === "en"
      ? cmsURL + data.event.pdf_en.url
      : cmsURL + data.event.pdf_de.url;
  const shareImage = data.event.SEO.ShareImage;

  return {
    props: {
      title,
      description,
      keywords,
      shareImage,
      content,
      pdfUrl,
      photos,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 300,
  };
}
