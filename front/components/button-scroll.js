import { Link } from 'react-scroll';
import { useRouter } from 'next/router';

export default function ButtonScroll(props) {
    const curRoute = useRouter().pathname;
    const onEvents = (curRoute == "/events") ? true : false
    console.log("ButtonScroll", props.link)

    return (
        <>
            <button className={`button ${onEvents ? 'bg-rose-500 border-blood-500 text-blood-500 hover:bg-blood-500  hover:text-rose-500' : 'bg-olive-500 border-gold-500 text-gold-500 hover:bg-gold-400 hover:text-olive-500'}`}>
                <Link to={`${props.link}`} spy={true} smooth={true}>{props.title}</Link>
            </button>
        </>
    )
}
