import { Fade as Hamburger } from "hamburger-react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import useLockBodyScroll from "./utils/body-lock-scroll";
import Modal from "./modal";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./language-switcher";
import { useRouter } from "next/router";

const navItems = [
  {
    name: "SOUL",
    url: "/soul",
  },
  {
    name: "LOCAL",
    url: "/local",
  },
  {
    name: "MENU",
    url: "/seasonal",
  },
  {
    name: "DAILY",
    url: "/daily",
  },
  {
    name: "EVENTS",
    url: "/events",
  },
];

export default function NavBar({ fixed }) {
  const [locked, toggleLocked] = useLockBodyScroll(false);
  const [showModal, setShowModal] = React.useState(false);
  const curRoute = useRouter().pathname;
  const onEvents = curRoute == "/events" ? true : false;
  const { t } = useTranslation("common");
  return (
    <>
      <div className={`relative ${onEvents ? "bg-blue-dark" : "bg-olive-500"}`}>
        <div className="modal-fix">
          <div className="mx-auto">
            <nav
              className={`px-4 py-5 ${
                onEvents ? "bg-blue-dark" : "bg-olive-500"
              }`}
            >
              <ul className="hidden lg:flex content-center justify-center items-center pb-6">
                {navItems.map((item) => (
                  <li
                    className="font-light text-gold-500 text-xl px-5 transition duration-500 hover:underline"
                    key={item.name}
                  >
                    <Link href={item.url}>{t(`${item.name}`)}</Link>
                  </li>
                ))}
                <>
                  <li className="font-light text-gold-500 text-xl px-5 transition duration-500 hover:underline">
                    <a
                      href="https://www.opentable.de/r/seven-hills-reservations-koln?restref=248958&lang=en-US&ot_source=Restaurant%20website"
                      target="_blank"
                    >
                      {t("RESERVATION")}
                    </a>
                  </li>
                </>
                <a
                  className="ml-3 w-6 h-6 transition duration-700 transform hover:scale-150"
                  href="https://instagram.com/sevenhills_restaurant"
                  target="_blank"
                >
                  <button className="text-gold-500 pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                </a>
                <a
                  className="ml-4 mr-3 w-6 h-6 transition duration-700 transform hover:scale-150"
                  href="https://www.facebook.com/SevenHillsRestaurantCGN/"
                  target="_blank"
                >
                  <button className="text-gold-500 pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
                    </svg>
                  </button>
                </a>
                <LanguageSwitcher />
              </ul>

              <div className="flex justify-end">
                <div className="lg:hidden text-gold-500">
                  <Hamburger
                    toggled={showModal}
                    toggle={() => {
                      setShowModal(true);
                      toggleLocked();
                    }}
                  />
                </div>
                <div className="z-50">
                  <Transition
                    show={showModal}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Modal
                      navItems={navItems}
                      onClose={() => {
                        setShowModal(false);
                        toggleLocked();
                      }}
                    />
                  </Transition>
                </div>
              </div>
              <div className="container mx-auto">
                <div className="lg:mx-32 md:mx-20 mx-2">
                  <a
                    className="text-xl text-white font-bold leading-relaxed py-2 whitespace-no-wrap uppercase"
                    href="/"
                  >
                    <img
                      alt="logo"
                      src={`${onEvents ? "/logo-events.png" : "/logo.png"}`}
                    />
                    {/* <Image src={`${onEvents ? '/logo_events.png' : '/logo.png'}`} width={600} height={155} /> */}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
