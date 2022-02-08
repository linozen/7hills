// Translations
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// API
import { CMS_URL, fetchItems } from "../lib/api";

// SEO
import { NextSeo } from "next-seo";

// Components
import BackToTop from "../components/back-to-top";
import ButtonScroll from "../components/button-scroll";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories.js";
import NavBar from "../components/navbar";

// Packages
import ReactMarkdown from "react-markdown";

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
              <img
                className="object-cover h-full w-full"
                alt="trees"
                src="/trees.jpg"
              />
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div id="content" className="w-full bg-olive-500 pt-12">
          <div className="prose prose-lg md:prose-xl text-gold-500 px-5 mx-auto">
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>
        </div>

        {/* More Stories */}
        <div>
          {props.posts_merged.length > 0 && (
            <MoreStories posts={props.posts_merged} />
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Get data from CMS
  const data = await fetchItems("Soul");
  const data_trans = await fetchItems("Soul_translations");
  const posts = await fetchItems("Soul_Posts");
  const posts_trans = await fetchItems("Soul_Posts_translations");

  // Get page texts by locale
  const de = data_trans.filter((obj) => {
    return obj.languages_code === "de-DE";
  });
  const en = data_trans.filter((obj) => {
    return obj.languages_code === "en-US";
  });
  const title = locale === "en" ? en[0].title : de[0].title;
  const content = locale === "en" ? en[0].content : de[0].content;
  const description = locale === "en" ? en[0].description : de[0].description;

  // Get locale-specific posts data
  const posts_en = posts_trans.filter((obj) => {
    return obj.languages_code === "en-US";
  });
  const posts_de = posts_trans.filter((obj) => {
    return obj.languages_code === "de-DE";
  });

  // Merge with language-independent posts data
  const posts_merged =
    locale === "en"
      ? posts.map((value, index) => {
          return {
            slug: value.slug,
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            date: value.date,
            title: posts_en[index].title,
            excerpt: posts_en[index].excerpt,
          };
        })
      : posts.map((value, index) => {
          return {
            slug: value.slug,
            coverImageUrl: `${CMS_URL}/assets/${value.cover}`,
            date: value.date,
            title: posts_de[index].title,
            excerpt: posts_de[index].excerpt,
          };
        });

  return {
    props: {
      title,
      description,
      content,
      posts_merged,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
