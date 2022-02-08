/* eslint-disable react/no-danger */
/* eslint-disable react/destructuring-assignment */
import ReactMarkdown from "react-markdown";
import Container from "./container";

export default function Menu({ props }) {
  return (
    <>
      <div className="bg-olive-500 py-10">
        <Container>
          <div
            className="min-h-screen prose md:prose-xl text-gold-500 px-5 mx-auto lg:text-center"
            data-aos="fade-up"
          >
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>
        </Container>
      </div>
    </>
  );
}
