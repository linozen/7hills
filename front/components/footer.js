import Link from "next/link";
import { useRouter } from "next/router";
import Container from "./container";
import Button from "./button";
import { useTranslation, Trans } from "next-i18next";

export default function Footer() {
  const curRoute = useRouter().pathname;
  const onEvents = curRoute == "/events" ? true : false;
  const { t } = useTranslation("common");
  return (
    <footer className={`${onEvents ? "bg-blue-dark" : "bg-olive-500"}`}>
      <Container>
        <div className="py-28 flex flex-col lg:flex-row lg:px-12 items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left px-4 mb-10 lg:mb-4 lg:w-1/2 text-gold-500">
            {t(
              "We travel the world, but our cheese doesn't. Closeness is what counts"
            )}
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:p-3 lg:w-1/2">
            {/* <Button */}
            {/*   title={t('BOOK TABLE')} */}
            {/*   link="https://www.opentable.de/restref/client/?restref=248958&ot_source=Restaurant%20website&corrid=b92b7fc3-8dab-4563-8edd-464ff717eb79" /> */}
            <Button title={t("SEE MENU")} link="/seasonal" />
          </div>
          <Link href="/privacy">
            <a className="text-lg px-3 text-center md:text-left hover:underline text-gold-500">
              {t("PRIVACY & IMPRINT")}
            </a>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
