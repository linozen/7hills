/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSeasonal } from '../lib/api';
import NavBar from '../components/navbar';
import Layout from '../components/layout';
import Menu from '../components/menu';
import BackToTop from '../components/back-to-top'

export default function Seasonal(props) {
  return (
    <>
      <Layout>
        <Head>
          <title>
            {props.title} | Seven Hills Restaurant
          </title>
        </Head>
        <NavBar />
        <BackToTop />
        <Menu props={props} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const data = await getSeasonal();
  const title = locale === 'en' ? data.seasonal.title_en : data.seasonal.title_de;
  const content = locale === 'en' ? data.seasonal.content_en : data.seasonal.content_de;
  return {
    props: {
      title,
      content,
      ...await serverSideTranslations(locale, ['common']),
    },
  };
}
