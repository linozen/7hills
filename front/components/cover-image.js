import Link from 'next/link'

export default function CoverImage({ title, url, slug }) {
  const imageUrl = `${url.startsWith('/') ? process.env.STRAPI_API_URL : ''
    }${url}`
  return (
    <div className="sm:mx-0">
      {slug ? (
        <a aria-label={title}>
          <img src={imageUrl} alt={title} />
        </a>
      ) : (
          <img src={imageUrl} alt={title} />
        )}
    </div>
  )
}
