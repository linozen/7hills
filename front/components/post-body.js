// import markdownStyles from './markdown-styles.module.css'

import ReactMarkdown from "react-markdown";

export default function PostBody({ content }) {
  return (
    <div className="font-serif pt-3 bg-olive-500 text-gold-500 prose prose-lg lg:prose-xl max-w-2xl px-5 mx-auto" data-aos="fade-up">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}
