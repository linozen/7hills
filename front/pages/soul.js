/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { getAllPostsForSoul, getSoul } from '../lib/api.js'
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Button from "../components/button";
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";
import MoreStories from "@/components/more-stories.js";

export default function Soul(props) {
  const { t } = useTranslation("common");
  console.log(props.posts)
  return (
    <>
      <Layout>
        <Head>
          <title>Seven Hills Restaurant</title>
        </Head>

        <div className="flex flex-col h-screen">

          <div className="w-full flex-none">
            <NavBar />
          </div>
          <BackToTop />


          <div className="relative bg-olive-500 flex-auto w-full h-full">

            <div className="-z-10 flex justify-between items-center flex-col h-full ">

              <Image
                className="gradient-mask-t-10% bottom-inner-shadow"
                src="/trees2.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />

              <div className="z-10 relative text-center pt-24 text-7xl lg:text-9xl lg:pt-4 lg:pt-36">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-300">
                  {props.title}
                </span>
              </div>

              <div className="w-full flex justify-center pb-12 lg:pb-24 relative z-10 bottom-inner-shadow">
                <Button
                  title={t("READ MORE")}
                  link="#soul-content"
                />
              </div>
            </div>

          </div>

        </div>
        <div className="w-full bg-olive-500 pt-12">
          <div id="soul-content" className="prose prose-xl text-gold-500 px-5 mx-auto">
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
