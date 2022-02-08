// Translations
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// API
import { CMS_URL, fetchItems } from "../../lib/api";

// Packages
import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";

// Components
import BackToTop from "../../components/back-to-top";
import ButtonScroll from "../../components/button-scroll";
import Layout from "../../components/layout";
import MoreStories from "../../components/more-stories";
import NavBar from "../../components/navbar";

export default function Post({ post, more }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
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
            <title>{post.title} | Seven Hills Restaurant</title>
            <meta property="og:image" content={post.coverImageUrl} />
          </Head>

          <div className="flex flex-col h-screen">
            <div className="w-full flex-initial">
              <NavBar />
            </div>
            <BackToTop />

            <div className="border-t border-b border-gold-500 relative bg-olive-500 flex-1 overflow-hidden">
              <div className="relative w-full h-full overflow-hidden">
                <div className="z-10 uppercase absolute h-full w-full flex flex-col items-center justify-around pt-32">
                  <div className="px-5 bg-olive-500 py-2 md:px-10 w-full text-center border-b border-t md:border md:max-w-3xl border-gold-500 bg-opacity-70 backdrop-filter backdrop-blur-md shadow-2xl">
                    <span className="text-3xl md:text-6xl shimmer text-center overflow-hidden break-words">
                      {post.title}
                    </span>
                  </div>
                  <ButtonScroll link="content" />
                </div>
                <Image
                  className="object-cover h-full w-full"
                  alt="trees"
                  src={post.coverImageUrl}
                  layout="fill"
                />
              </div>
            </div>
          </div>

          <div id="content" className="w-full bg-olive-500 pt-12">
            <div className="prose prose-lg md:prose-2xl overflow-hidden break-words text-gold-500 px-5 mx-auto">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            {post.videoUrl !== `${CMS_URL}/assets/null` ? (
              <div className="mt-12 player-wrapper">
                <ReactPlayer
                  light={post.coverImageUrl}
                  playing={true}
                  controls={true}
                  className="react-player"
                  volume={0}
                  url={`${post.videoUrl}.m4v`}
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <div></div>
            )}
            {more.length > 0 && <MoreStories posts={more} />}
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  // Get all posts
  const allPosts = await fetchItems("Soul_Posts");
  const allPostsTrans = await fetchItems("Soul_Posts_translations");
  const allPostsEn = allPostsTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const allPostsDe = allPostsTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });

  // Filter for current post data
  const curPost = allPosts.filter((item) => {
    return item.slug === params.slug;
  });

  // Get translations of current post
  const curPostDe = allPostsDe.filter((item) => {
    return item.Soul_Posts_id === curPost[0].id;
  });
  const curPostEn = allPostsEn.filter((item) => {
    return item.Soul_Posts_id === curPost[0].id;
  });

  // Merge with language-independent post data
  const post =
    locale === "en"
      ? {
          slug: curPost[0].slug,
          coverImageUrl: `${CMS_URL}/assets/${curPost[0].cover}`,
          date: curPost[0].date,
          title: curPostEn[0].title,
          content: curPostEn[0].content,
          videoUrl: `${CMS_URL}/assets/${curPost[0].video}`,
        }
      : {
          slug: curPost[0].slug,
          coverImageUrl: `${CMS_URL}/assets/${curPost[0].cover}`,
          date: curPost[0].date,
          title: curPostDe[0].title,
          content: curPostDe[0].content,
          videoUrl: `${CMS_URL}/assets/${curPost[0].video}`,
        };

  // Get more posts and its translations
  const morePosts = allPosts.filter((item) => {
    return item.slug !== params.slug;
  });
  const morePostsTrans = allPostsTrans.filter((item) => {
    return item.Soul_Posts_id !== curPost[0].id;
  });

  // Get locale-specific more posts data
  const morePostsEn = morePostsTrans.filter((item) => {
    return item.languages_code === "en-US";
  });
  const morePostsDe = morePostsTrans.filter((item) => {
    return item.languages_code === "de-DE";
  });

  //
  const more =
    locale === "en"
      ? morePosts.map((value, index) => {
          return {
            slug: value.slug,
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            date: value.date,
            title: morePostsEn[index].title,
            excerpt: morePostsEn[index].excerpt,
          };
        })
      : morePosts.map((value, index) => {
          return {
            slug: value.slug,
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            date: value.date,
            title: morePostsDe[index].title,
            excerpt: morePostsDe[index].excerpt,
          };
        });

  return {
    props: {
      post,
      more,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths(locale) {
  const allPosts = await fetchItems("Soul_Posts");
  return {
    paths: allPosts?.map((post) => `/soul/${post.slug}`) || [],
    fallback: true,
  };
}
