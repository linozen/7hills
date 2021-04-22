import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import MoreStories from '@/components/more-stories';
import NavBar from '@/components/navbar';
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api';
import Head from 'next/head';
import Image from 'next/image'
import ButtonScroll from '@/components/button-scroll'
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";

export default function Post({ post, morePosts }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout >
      {router.isFallback ? (
        <div className="h-screen bg-olive-500">
          <NavBar />
          <div className="text-center text-gold-500 text-7xl h-full w-full bg-olive-500">
            loading ...
          </div>
        </div>
      ) : (
          <>
            <Head>
              <title>
                {post.title} | Seven Hills Restaurant
              </title>
              <meta property="og:image" content={post.coverImageUrl} />
            </Head>

            <div className="flex flex-col h-screen">

              <div className="w-full flex-none">
                <NavBar />
              </div>
              <BackToTop />

              <div className="relative bg-olive-500 flex-auto w-full h-full">

                <div className="-z-10 flex justify-between items-center flex-col h-full ">

                  <Image
                    className="bottom-inner-shadow"
                    src={post.coverImageUrl}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />

                  <div className="z-10 relative text-center pt-24 text-7xl lg:text-9xl lg:pt-4 lg:pt-36">
                    <div className="border border-gold-500 bg-olive-500 bg-opacity-80 backdrop-filter backdrop-blur-md px-5 py-2 shadow-2xl">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-300">
                        {post.title}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex justify-center pb-12 lg:pb-24 relative z-10 bottom-inner-shadow">
                    <ButtonScroll
                      title={t("READ MORE")}
                      link="post-content"
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="w-full bg-olive-500 pt-12">
              <div id="post-content" className="prose prose-xl text-gold-500 px-5 mx-auto">
                <ReactMarkdown>
                  {post.content}
                </ReactMarkdown>
              </div>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
          </>
        )}
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const data = await getPostAndMorePosts(params.slug);

  // get URL of backend from env
  const apiUrl = process.env.STRAPI_API_URL

  // single post data (translated)
  const title = locale === 'en' ? data?.posts[0]?.title_en || '' : data?.posts[0]?.title_de || '';
  const content = locale === 'en' ? data?.posts[0]?.content_en || '' : data?.posts[0]?.content_de || '';
  const slug = data?.posts[0]?.slug
  const coverImageUrl = apiUrl + data?.posts[0]?.coverImage?.url
  const date = data?.posts[0]?.date

  // additional post data (translated)
  const morePostDataTrans = locale === 'en' ?
    // drop unneeded properties of objects
    data?.morePosts.map(({ title_de, content_de, excerpt_de, ...keepEn }) => keepEn)
    : data?.morePosts.map(({ title_en, content_en, excerpt_en, ...keepDe }) => keepDe)

  // rename properties
  const morePostData = locale === 'en' ?
    morePostDataTrans.map(function(obj) {
      return {
        title: obj.title_en,
        content: obj.content_en,
        excerpt: obj.excerpt_en,
        date: obj.date,
        slug: obj.slug,
        coverImageUrl: apiUrl + obj.coverImage.url
      }
    }) :
    morePostDataTrans.map(function(obj) {
      return {
        title: obj.title_de,
        content: obj.content_de,
        excerpt: obj.excerpt_de,
        date: obj.date,
        slug: obj.slug,
        coverImageUrl: apiUrl + obj.coverImage.url
      }
    })

  return {
    props: {
      apiUrl,
      post: {
        slug,
        title,
        coverImageUrl,
        content,
        date,
      },
      morePosts:
        morePostData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths(locale) {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/soul/${locale}/${post.slug}`) || [],
    fallback: true,
  };
}
