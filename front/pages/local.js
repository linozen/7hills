/* eslint-disable react/react-in-jsx-scope */
import { getLocal, getProducers } from '../lib/api'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import ImageBlock from "../components/image-block"
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";
import { NextSeo } from 'next-seo';

export default function Local(props) {
  const producers = props.data.producers
  return (
    <>
      <NextSeo
        title={props.title}
        titleTemplate='%s | Seven Hills Restaurant'
        description={props.description}
        additionalMetaTags={[{
          name: 'keywords',
          content: props.keywords
        }]}
        openGraph={{
          description: props.description,
        }}
      />
      <Layout>
        <NavBar />
        <div className="w-full bg-olive-500">
          <div className="flex items-center justify-center container mx-auto md:py-12">
            <div className="prose prose-lg md:prose-xl md:text-center px-5 lg:px-12 text-gold-500">
              <ReactMarkdown>
                {props.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <BackToTop />
        {producers.map(p => {
          return (
            <>
              <ImageBlock props={p} apiUrl={props.apiUrl} />
            </>
          )
        })}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getProducers();
  const dataLocal = await getLocal();

  const title = locale === "en" ? dataLocal.local.title_en : dataLocal.local.title_de;
  const content = locale === "en" ? dataLocal.local.content_en : dataLocal.local.content_de;

  const description = locale === 'en' ?
    dataLocal.local.SEO.metaDescription_en :
    dataLocal.local.SEO.metaDescription_de

  const keywords = locale === 'en' ?
    dataLocal.local.SEO.keywords_en :
    dataLocal.local.SEO.keywords_de

  const apiUrl = process.env.STRAPI_API_URL
  return {
    props: {
      description,
      keywords,
      apiUrl,
      title,
      content,
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
