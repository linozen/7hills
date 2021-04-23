import Date from './date'
import Link from 'next/link'
import Image from 'next/image'

export default function PostPreview({
  title,
  coverImageUrl,
  date,
  excerpt,
  slug,
}) {
  return (
    <div className="p-5">
      <div className="overflow-hidden border border-gold-500 relative h-96 w-full mb-5">
        <Link as={`/soul/${slug}`} href="/soul/[slug]">
          <button>
            <Image
              src={coverImageUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority={true}
            />
          </button>
        </Link>
      </div>
      <h3 className="uppercase text-gold-500 text-3xl mb-3 leading-snug">
        <Link as={`/soul/${slug}`} href="/soul/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="lowercase text-xl mb-4 text-gold-500 font-light">
        <Date dateString={date} />
      </div>
      <p className="font-serif text-gold-500 text-lg leading-relaxed mb-8">{excerpt}</p>
    </div>
  )
}
