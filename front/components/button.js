import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Button(props) {
    const title = props.title
    const link = props.link
    const curRoute = useRouter().pathname;
    const onEvents = (curRoute == "/events") ? true : false

    return (
        <>
            <Link
                href={link}>
                <a className={`button ${onEvents ? 'bg-rose-500 border-blood-500 text-blood-500 hover:bg-blood-500  hover:text-rose-500' : 'bg-olive-500 border-gold-500 text-gold-500 hover:bg-gold-400 hover:text-olive-500'}`}
                >{title}</a>
            </Link>
        </>
    )
}
