import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className="bg-olive-500">
        <h2 className="mx-5 pt-24 text-gold-500 text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
          More Stories
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
