import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const curLocale = useRouter().locale;
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  return (
    <>
      <div className="px-6 py-4 lg:py-0">
        <button
          className={`language-switcher ${onEvents ? 'text-blood-500 border-blood-500 hover:bg-blood-500 hover:border-blood-500 hover:text-rose-500' : 'text-gold-500 border-gold-500 hover:bg-gold-400 hover:border-gold-400  hover:text-olive-500'}`}
        >
          <Link
            href={curRoute}
            locale={curLocale === 'en' ? 'de' : 'en'}
          >
            {curLocale === 'en' ? 'DE' : 'EN'}
          </Link>
        </button>
      </div>
    </>
  );
}
