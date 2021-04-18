import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '@/components/container';
import PostBody from '@/components/post-body';
import MoreStories from '@/components/more-stories';
import NavBar from '@/components/navbar';
import PostHeader from '@/components/post-header';
import SectionSeparator from '@/components/section-separator';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from '@/components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api';
import PostTitle from '@/components/post-title';
import Head from 'next/head';
import { CMS_NAME } from '@/lib/constants';
import markdownToHtml from '@/lib/markdownToHtml';

export default function Post({ post, morePosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout >
      <NavBar />
      {router.isFallback ? (
        <div className="h-screen bg-olive-500">
          <PostTitle>
            Loading ...
          </PostTitle>
        </div>
      ) : (
          <>
            <Head>
              <title>
                {post.title}
              </title>
              <meta property="og:image" content={post.coverImageUrl} />
            </Head>
            <div className="bg-olive-500">
              <PostBody content={post.content} />
              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
          </>
        )}
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const data = await getPostAndMorePosts(params.slug);

  const apiUrl = process.env.STRAPI_API_URL
  const title = locale === 'en' ? data?.posts[0]?.title_en || '' : data?.posts[0]?.title_de || '';
  const content = locale === 'en' ? data?.posts[0]?.content_en || '' : data?.posts[0]?.content_de || '';
  const slug = data?.posts[0]?.slug
  const coverImageUrl = apiUrl + data?.posts[0]?.coverImage?.url
  const date = data?.posts[0]?.date

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
      morePosts: data?.morePosts,
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
