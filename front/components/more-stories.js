import PostPreview from './post-preview'
import { useTranslation } from "next-i18next";

export default function MoreStories({ posts }) {
  const { t } = useTranslation("common");
  return (
    <section>
      <div className="bg-olive-500">
        <h2 className="mx-5 pt-20 text-gold-500 text-3xl md:text-5xl">
          {t("MORE STORIES FROM THE SEVEN HILLS")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:col-gap-x-16 lg:col-gap-32 row-gap-20 md:row-gap-32">
          {posts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImageUrl={post.coverImageUrl}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
