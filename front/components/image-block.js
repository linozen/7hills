import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function ImageBlock({ props }) {
  return (
    <>
      <section className="text-gold-500 bg-olive-500">
        <div className="md:flex-row container mx-auto flex px-5 lg:px-12 py-12 flex-col">
          <div
            className="md:pr-5 lg:pr-12 lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-4 md:mb-0 text-left"
            data-aos="fade-right"
          >
            <a href={props.link} target="_blank">
              <div className="lowercase text-4xl text-gold-500 hover:underline">
                {props.title}
              </div>
            </a>
            <div className="lowercase font-light text-xl">{props.location}</div>
            <div className="text-left text-3xl font-light mb-3">
              {props.distance} km
            </div>
            <div className="lowercase text-xl">{props.people}</div>
            <div className="font-serif mb-3">{props.experience}</div>
            <ReactMarkdown className="markdown-local">
              {props.products}
            </ReactMarkdown>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2">
            <a href={props.link} target="_blank">
              <div
                className="lg:mb-20 shadow-2xl w-full h-72 md:h-80 lg:h-96 border border-gold-500 overflow-hidden"
                data-aos="fade-left"
              >
                <img
                  className="h-72 md:h-80 lg:h-96 w-full object-cover object-center transition duration-1000 transform  hover:scale-110"
                  alt="producer-image"
                  src={props.coverImageUrl}
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
