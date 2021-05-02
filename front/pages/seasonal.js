/* eslint-disable react/react-in-jsx-scope */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSeasonal } from '../lib/api';
import NavBar from '../components/navbar';
import Layout from '../components/layout';
import Menu from '../components/menu';
import BackToTop from '../components/back-to-top'
import { NextSeo } from 'next-seo';

export default function Seasonal(props) {
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
  const description = locale === 'en' ?
    data.seasonal.SEO.metaDescription_en :
    data.seasonal.SEO.metaDescription_de

  const keywords = locale === 'en' ?
    data.seasonal.SEO.keywords_en :
    data.seasonal.SEO.keywords_de

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
