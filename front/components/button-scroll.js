import { Link } from 'react-scroll';
import { useRouter } from 'next/router';

export default function ButtonScroll(props) {
    const curRoute = useRouter().pathname;
    const onEvents = (curRoute == "/events") ? true : false
    return (
        <>
            <Link to={`${props.link}`} spy={true} smooth={true}>
                <button
                    className={`back-to-top bg-opacity-80 backdrop-filter backdrop-blur-md shadow-lg ${onEvents ? 'bg-rose-500 border-blood-500 text-blood-500 hover:bg-blood-500 hover:text-rose-500' : 'bg-olive-500 border-gold-500 text-gold-500 hover:bg-gold-400 hover:text-olive-500'}`}
                    data-aos="fade-up">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </Link>
        </>
    )
}
