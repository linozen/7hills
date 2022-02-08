// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// API
import { CMS_URL, fetchItems } from "../lib/api";

// SEO
import { NextSeo } from "next-seo";

// Components
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Menu from "../components/menu";
import BackToTop from "../components/back-to-top";

export default function Daily(props) {
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
        <BackToTop />
        <Menu props={props} />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Get data from CMS
  const daily = await fetchItems("Daily");
  const dailyTrans = await fetchItems("Daily_translations");

  // Get page texts by locale
  const dailyDe = dailyTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });
  const dailyEn = dailyTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const title = locale === "en" ? dailyEn[0].title : dailyDe[0].title;
  const content = locale === "en" ? dailyEn[0].content : dailyDe[0].content;
  const description =
    locale === "en" ? dailyEn[0].description : dailyDe[0].description;

  return {
    props: {
      title,
      description,
      content,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
