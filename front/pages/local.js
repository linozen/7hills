/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { getProducers } from '../lib/api'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import ImageBlock from "../components/image-block"
import BackToTop from "@/components/back-to-top";

export default function Local(props) {
  const { t } = useTranslation("common");
  const locale = props._nextI18Next.initialLocale
  // console.log(locale)
  const producers = props.data.producers
  // console.log(producers)
  //
  const api_url = process.env.STRAPI_API_URL
  return (
    <>
      <Layout>
        <Head>
          <title>Seven Hills Restaurant</title>
        </Head>
        <NavBar />
        <BackToTop />

        {producers.map(p => {
          return (
            <>
              <ImageBlock props={p} api_url={props.apiUrl} />
            </>
          )
        })}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getProducers();
  const apiUrl = process.env.STRAPI_API_URL
  return {
    props: {
      apiUrl,
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
