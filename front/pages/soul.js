/* eslint-disable react/react-in-jsx-scope */
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllPostsForSoul, getSoul } from '../lib/api.js'
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import ButtonScroll from "../components/button-scroll";
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";
import MoreStories from "@/components/more-stories.js";
import { NextSeo } from 'next-seo';

export default function Soul(props) {
  return (
    <>
      <NextSeo
        description={props.description}
        openGraph={{
          description: props.description,
        }}
      />
      <Layout>
        {/* Content starts here */}
        <div className="flex flex-col h-screen">

          {/* NavBar and BackToTop */}
          <div className="w-full flex-initial">
            <NavBar />
          </div>
          <BackToTop />

          {/* Image with title */}
          <div className="border-t border-b border-gold-500 relative bg-olive-500 flex-1 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <div className="uppercase absolute h-full w-full flex flex-col items-center justify-around pt-32">
                <div className="bg-olive-500 py-2 md:px-4 w-full text-center border-b border-t md:border md:max-w-max border-gold-500 bg-opacity-70 backdrop-filter backdrop-blur-md shadow-2xl">
                  <span className="text-4xl md:text-6xl shimmer">
                    {props.title}
                  </span>
                </div>
                <ButtonScroll link="content" />
              </div>
              <img className="object-cover h-full w-full" alt="trees" src="/trees.jpg" />
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div id="content" className="w-full bg-olive-500 pt-12">
          <div className="prose prose-lg md:prose-xl text-gold-500 px-5 mx-auto">
            <ReactMarkdown>
              {props.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* More Stories */}
        <div>
          {props.posts.length > 0 && <MoreStories posts={props.posts} />}
        </div>

      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const dataSoul = await getSoul();
  const data = await getAllPostsForSoul();

  // get URL of backend from env
  const apiUrl = process.env.STRAPI_API_URL

  // additional post data (translated)
  const postsTrans = locale === 'en' ?
    // drop unneeded properties of objects
    data.map(({ title_de, excerpt_de, ...keepEn }) => keepEn)
    : data.map(({ title_en, excerpt_en, ...keepDe }) => keepDe)

  // rename properties
  const posts = locale === 'en' ?
    postsTrans.map(function(obj) {
      return {
        title: obj.title_en,
        excerpt: obj.excerpt_en,
        date: obj.date,
        slug: obj.slug,
        coverImageUrl: apiUrl + obj.coverImage.url
      }
    }) :
    postsTrans.map(function(obj) {
      return {
        title: obj.title_de,
        excerpt: obj.excerpt_de,
        date: obj.date,
        slug: obj.slug,
        coverImageUrl: apiUrl + obj.coverImage.url
      }
    })

  const title = locale === "en" ? dataSoul.soul.title_en : dataSoul.soul.title_de;
  const content = locale === "en" ? dataSoul.soul.content_en : dataSoul.soul.content_de;

  const description = locale === 'en' ?
    dataSoul.soul.SEO.metaDescription_en :
    dataSoul.soul.SEO.metaDescription_de

  const keywords = locale === 'en' ?
    dataSoul.soul.SEO.keywords_en :
    dataSoul.soul.SEO.keywords_de

  return {
    props: {
      apiUrl,
      title,
      description,
      keywords,
      content,
      posts,
      ...(await serverSideTranslations(locale, ["common"])),

    },
  };
}
