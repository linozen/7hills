import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from './container'
import Button from './button'
import { useTranslation, Trans } from 'next-i18next';

export default function Footer() {
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  const { t } = useTranslation('common');
  return (
    <footer className={`${onEvents ? 'bg-rose-500' : 'bg-olive-500'}`}>
      <Container>
        <div className="py-28 flex flex-col lg:flex-row lg:px-12 items-center">
          <h3 className={`text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left px-4 mb-10 lg:mb-4 lg:w-1/2 ${onEvents ? 'text-blood-500' : 'text-gold-500'}`}>
            <Trans i18nKey="TAGLINE">
              We travel the world, but our cheese doesn't. <br></br> Closeness is what counts
            </Trans>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:p-3 lg:w-1/2">
            <Button
              title={t('BOOK A TABLE')}
              link="https://opentable.de" />
          </div>
          <Link href="/privacy">
            <a
              className={`text-center md:text-left hover:underline ${onEvents ? 'text-blood-500' : 'text-gold-500'}`}>
              {t('PRIVACY & IMPRINT')}
            </a>
          </Link>
        </div>
      </Container>
    </footer>
  )
}
