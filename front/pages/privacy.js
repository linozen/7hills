/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import { getPrivacy } from '../lib/api'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import BackToTop from "@/components/back-to-top";
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
            <div className="prose prose-lg md:prose-xl px-5 lg:px-12 text-gold-500">
              <ReactMarkdown>
                {props.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <BackToTop />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getPrivacy();

  const title = locale === "en" ? data.privacy.title_en : data.privacy.title_de;
  const content = locale === "en" ? data.privacy.content_en : data.privacy.content_de;

  return {
    props: {
      title,
      content,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
