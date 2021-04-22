import { useRouter } from 'next/router';
import ScrollToTop from 'react-scroll-up';

export default function BackToTop() {
    const curRoute = useRouter().pathname;
    const onEvents = (curRoute == "/events") ? true : false

    return (
        <>
            <ScrollToTop
                showUnder={200}
                duration={1000}
                style={
                    {
                        position: 'fixed',
                        zIndex: 1000,
                        bottom: 50,
                        right: 30,
                        cursor: 'pointer',
                        transitionDuration: '0.2s',
                        transitionTimingFunction: 'easeInOutCubic',
                        transitionDelay: '0s'
                    }
                }
            >
                <div className={`back-to-top shadow-lg ${onEvents ? 'bg-rose-500 border-blood-500 text-blood-500 hover:bg-blood-500  hover:text-rose-500' : 'bg-olive-500 border-gold-500 text-gold-500 hover:bg-gold-400 hover:text-olive-500'}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </ScrollToTop>
        </>
    )
}
