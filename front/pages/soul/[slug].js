import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import MoreStories from '@/components/more-stories';
import NavBar from '@/components/navbar';
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api';
import Head from 'next/head';
import ButtonScroll from '@/components/button-scroll';
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";

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

              <div className="w-full flex-initial">
                <NavBar />
              </div>
              <BackToTop />


              <div className="border-t border-b border-gold-500 relative bg-olive-500 flex-1 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                  <div className="uppercase absolute h-full w-full flex flex-col items-center justify-around pt-32">
                    <div className="px-5 bg-olive-500 py-2 md:px-10 w-full text-center border-b border-t md:border md:max-w-3xl border-gold-500 bg-opacity-70 backdrop-filter backdrop-blur-md shadow-2xl">
                      <span className="text-3xl md:text-6xl shimmer text-center overflow-hidden break-words">
                        {post.title}
                      </span>
                    </div>
                    <ButtonScroll link="content" />
                  </div>
                  <img className="object-cover h-full w-full" alt="trees" src={post.coverImageUrl} />
                </div>
              </div>
            </div>

            <div id="content" className="w-full bg-olive-500 pt-12">
              <div className="prose prose-lg md:prose-2xl overflow-hidden break-words text-gold-500 px-5 mx-auto">
                <ReactMarkdown>
                  {post.content}
                </ReactMarkdown>

              </div>
              {post.videoUrl ? (
                <div className="mt-12 player-wrapper">
                  <ReactPlayer
                    light={post.coverImageUrl}
                    playing={true}
                    controls={true}
                    className='react-player'
                    volume={0}
                    url={post.videoUrl}
                    width='100%'
                    height='100%'
                  />
                </div>
              ) : (
                  <div>
                  </div>
                )}
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
  const videoUrl = data?.posts[0].video.url === "no_video" ? null : apiUrl + data.posts[0].video.url

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
        videoUrl,
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
