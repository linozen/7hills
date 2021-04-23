/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { getAllPostsForSoul, getSoul } from '../lib/api.js'
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import ButtonScroll from "../components/button-scroll";
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";
import MoreStories from "@/components/more-stories.js";

export default function Soul(props) {
  const { t } = useTranslation("common");
  // console.log(props.posts)
  return (
    <>
      <Layout>
        <Head>
          <title>{props.title} | Seven Hills Restaurant</title>
        </Head>
        {/* Content starts here */}
        <div className="flex flex-col h-screen">
          {/* NavBar and BackToTop */}
          <div className="w-full flex-none">
            <NavBar />
          </div>
          <BackToTop />
          {/* Image with Button */}
          <div className="border-t border-gold-500 relative bg-olive-500 flex-auto w-full h-full">
            <div className="-z-10 flex justify-between items-center flex-col h-full ">
              <Image
                src="/leaves.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority={true}
              />
              <div className="z-10 relative text-center pt-24 text-7xl lg:text-9xl lg:pt-4 lg:pt-36">
                <div className="border border-gold-500 bg-olive-500 bg-opacity-80 backdrop-filter backdrop-blur-md px-5 py-2 shadow-2xl">
                  <span className="uppercase bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-300">
                    {props.title}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-center pb-12 lg:pb-24 relative z-10 bottom-inner-shadow">
                <ButtonScroll
                  link="soul-content"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Soul Content */}
        <div id="soul-content" className="w-full bg-olive-500 pt-12">
          <div className="prose prose-xl text-gold-500 px-5 mx-auto">
            <ReactMarkdown>
              {props.content}
            </ReactMarkdown>
          </div>
        </div>
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

  return {
    props: {
      apiUrl,
      title,
      content,
      posts,
      ...(await serverSideTranslations(locale, ["common"])),

    },
  };
}
