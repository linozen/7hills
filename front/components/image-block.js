import { useRouter } from 'next/router';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ImageBlock({ props, api_url }) {
    const curLocale = useRouter().locale;
    const title = curLocale === "en" ? props.title_en : props.title_de;
    const location = curLocale === "en" ? props.location_en : props.location_de;
    const people = curLocale === "en" ? props.people_en : props.people_de;
    const experience = curLocale === "en" ? props.experience_en : props.experience_de;
    const distance = props.distance;
    const products = curLocale === "en" ? props.products_en : props.products_de;
    const imageSide = props.imageSide

    console.log(api_url + props.coverImage.url)

    return (
        <>
            <section className="text-gold-500 bg-olive-500">
                <div className={`${imageSide ? 'md:flex-row-reverse' : 'md:flex-row'} container mx-auto flex px-5 lg:px-12 py-12 flex-col`} >
                    <div
                        className={`${imageSide ? 'md:pl-5 lg:pl-12' : 'md:pr-5 lg:pr-12'} lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-4 md:mb-0 text-left`}
                        data-aos={`${imageSide ? 'fade-left' : 'fade-right'}`}
                    >
                        <div className="text-4xl text-gold-500">
                            {title}
                        </div>
                        <div className="font-light text-xl">{location}</div>
                        <div className="text-left text-3xl font-light mb-3">{distance} km</div>
                        <div className="text-xl">{people}</div>
                        <div className="font-serif mb-3">{experience}</div>
                        <ReactMarkdown className="markdown-local">
                            {products}
                        </ReactMarkdown>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2">
                        <div
                            className="relative shadow-2xl w-full h-96 md:h-80 lg:h-96 border border-gold-500"
                            data-aos={`${imageSide ? 'fade-right' : 'fade-left'}`}
                        >
                            <Image
                                src={api_url + props.coverImage.url}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
