/* eslint-disable react/react-in-jsx-scope */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getDaily } from '../lib/api';
import NavBar from '../components/navbar';
import Layout from '../components/layout';
import Menu from '../components/menu';
import BackToTop from '../components/back-to-top'
import { NextSeo } from 'next-seo';

export default function Daily(props) {
  return (
    <>
      <NextSeo
        title={props.title}
        titleTemplate='%s | Seven Hills Restaurant'
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

export async function getServerSideProps({ locale }) {
  const data = await getDaily();
  const title = locale === 'en' ? data.daily.title_en : data.daily.title_de;
  const content = locale === 'en' ? data.daily.content_en : data.daily.content_de;

  const description = locale === 'en' ?
    data.daily.SEO.metaDescription_en :
    data.daily.SEO.metaDescription_de

  const keywords = locale === 'en' ?
    data.daily.SEO.keywords_en :
    data.daily.SEO.keywords_de

  return {
    props: {
      title,
      description,
      keywords,
      content,
      ...await serverSideTranslations(locale, ['common']),
    },
  };
}
