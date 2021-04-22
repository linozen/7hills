/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getDaily } from '../lib/api';
import NavBar from '../components/navbar';
import Layout from '../components/layout';
import Menu from '../components/menu';
import BackToTop from '../components/back-to-top'

export default function Daily(props) {
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
  const data = await getDaily();
  const title = locale === 'en' ? data.daily.title_en : data.daily.title_de;
  const content = locale === 'en' ? data.daily.content_en : data.daily.content_de;
  return {
    props: {
      content,
      ...await serverSideTranslations(locale, ['common']),
    },
  };
}
