// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// API
import { fetchItems } from "../lib/api";

// Components
import Head from "next/head";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import BackToTop from "../components/back-to-top";
import ReactMarkdown from "react-markdown";

export default function Local(props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{props.title} | Seven Hills Restaurant</title>
        </Head>
        <NavBar />
        <div className="w-full bg-olive-500">
          <div className="flex items-center justify-center container mx-auto md:py-12">
            <div className="prose prose-lg md:prose-xl break-words overflow-hidden px-5 lg:px-12 text-gold-500">
              <ReactMarkdown>{props.content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <BackToTop />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Get data from CMS
  const privacyTrans = await fetchItems("Privacy_translations");

  // Get page texts by locale
  const privacyDe = privacyTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });
  const privacyEn = privacyTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const title = locale === "en" ? privacyEn[0].title : privacyDe[0].title;
  const content = locale === "en" ? privacyEn[0].content : privacyDe[0].content;

  return {
    props: {
      title,
      content,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
