// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// API
import { CMS_URL, fetchItems } from "../lib/api";

// SEO
import { NextSeo } from "next-seo";

// Components
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import ImageBlock from "../components/image-block";
import BackToTop from "../components/back-to-top";

// Packages
import ReactMarkdown from "react-markdown";

export default function Local(props) {
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
        <NavBar />
        <div className="w-full bg-olive-500">
          <div className="flex items-center justify-center container mx-auto md:py-12">
            <div className="prose prose-lg md:prose-xl md:text-center px-5 lg:px-12 text-gold-500">
              <ReactMarkdown>{props.content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <BackToTop />
        {props.producers.map((p) => {
          return (
            <>
              <ImageBlock props={p} />
            </>
          );
        })}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Get data from CMS
  const local = await fetchItems("Local");
  const localTrans = await fetchItems("Local_translations");
  const allProducers = await fetchItems("Producers");
  const allProducersTrans = await fetchItems("Producers_translations");

  // Get page texts by locale
  const localDe = localTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });
  const localEn = localTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const title = locale === "en" ? localEn[0].title : localDe[0].title;
  const content = locale === "en" ? localEn[0].content : localDe[0].content;
  const description =
    locale === "en" ? localEn[0].description : localDe[0].description;

  // Get locale-specific producers data
  const allProducersEn = allProducersTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const allProducersDe = allProducersTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });

  const producers =
    locale === "en"
      ? allProducers.map((value, index) => {
          return {
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            distance: value.distance,
            link: value.link,
            title: allProducersEn[index].title,
            location: allProducersEn[index].location,
            people: allProducersEn[index].people,
            experience: allProducersEn[index].experience,
            products: allProducersEn[index].products,
          };
        })
      : allProducers.map((value, index) => {
          return {
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            distance: value.distance,
            link: value.link,
            title: allProducersDe[index].title,
            location: allProducersDe[index].location,
            people: allProducersDe[index].people,
            experience: allProducersDe[index].experience,
            products: allProducersDe[index].products,
          };
        });

  return {
    props: {
      title,
      content,
      description,
      producers,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
