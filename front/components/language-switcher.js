import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const curLocale = useRouter().locale;
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  const { slug } = useRouter().query
  return (
    <>
      <div className="text-2xl lg:text-xl px-5 py-4 lg:py-0">
        <button
        /* className={`language-switcher ${onEvents ? 'text-blood-500 border-blood-500 hover:bg-blood-500 hover:border-blood-500 hover:text-rose-500' : 'text-gold-500 border-gold-500 hover:bg-gold-400 hover:border-gold-400  hover:text-olive-500'}`} */
        >
          {slug ?
            <Link
              href={{
                pathname: `${curRoute}`,
                query: { slug: `${slug}` }
              }}
              locale={curLocale === 'en' ? 'de' : 'en'}
            >
              {curLocale === 'en' ?
                <div className="font-sans text-gold-500">
                  EN<span className="font-light"> | DE</span>
                </div> :
                <div className="font-sans text-gold-500">
                  <span className="font-light">EN | </span>DE
                </div>
              }
            </Link>
            :
            <Link
              href={curRoute}
              locale={curLocale === 'en' ? 'de' : 'en'}
            >
              {curLocale === 'en' ?
                <div className="font-sans text-gold-500">
                  EN<span className="font-light"> | DE</span>
                </div> :
                <div className="font-sans text-gold-500">
                  <span className="font-light">EN | </span>DE
                </div>
              }
            </Link>
          }
        </button>
      </div>
    </>
  );
}
