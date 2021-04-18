/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, withTranslation, Trans } from "next-i18next";
import { getSoul } from '../lib/api.js'
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import Button from "../components/button";
import BackToTop from "@/components/back-to-top";
import ReactMarkdown from "react-markdown";

export default function Soul(props) {
  const { t } = useTranslation("common");
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

          <div className="bg-olive-500 text-center text-6xl lg:text-8xl lg:pt-4 lg:pb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-400">
              {props.title}
            </span>
          </div>

          <div className="relative bg-olive-500 flex-auto w-full h-full">
            <div className="-z-10 flex items-center flex-col-reverse h-full ">
              <Image
                className="gradient-mask-t-10% bottom-inner-shadow"
                src="/leaves.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div className="w-full flex justify-center pb-12 lg:pb-24 relative z-10 bottom-inner-shadow">
                <Button
                  title={t("READ MORE")}
                  link="#soul-content"
                />
              </div>
            </div>

          </div>

        </div>
        <div className="w-full bg-olive-500">
          <div id="soul-content" className="prose prose-xl text-gold-500 px-5 mx-auto pt-8" data-aos="fade-up" data-aos-duration="1500">
            <ReactMarkdown>
              {props.content}
            </ReactMarkdown>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getSoul();
  console.log(data)
  const title = locale === "en" ? data.soul.title_en : data.soul.title_de;
  const content = locale === "en" ? data.soul.content_en : data.soul.content_de;
  return {
    props: {
      title,
      content,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
