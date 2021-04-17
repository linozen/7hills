// import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div className="font-serif prose prose-teal prose-lg lg:prose-xl max-w-2xl mx-auto" data-aos="fade-up">
      <div
        /* className={markdownStyles['markdown']} */
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
