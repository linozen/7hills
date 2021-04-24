import { useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import useLockBodyScroll from "./utils/body-lock-scroll";
import Image from "next/image";
import Modal from "./modal";
import Container from "./container";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./language-switcher";
import { useRouter } from 'next/router';

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
  {
    name: "RESERVATION",
    url: "https://opentable.de",
  },
];

export default function NavBar({ fixed }) {
  const [locked, toggleLocked] = useLockBodyScroll(false);
  const [showModal, setShowModal] = useState(false);
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  const { t } = useTranslation("common");
  return (
    <>
      <div className={`relative ${onEvents ? 'bg-rose-500' : 'bg-olive-500'}`}>
        <div className="modal-fix">
          <Container>
            <nav className={`px-4 py-5 ${onEvents ? 'bg-rose-500' : 'bg-olive-500'}`}>
              <ul className="hidden lg:flex content-center justify-center items-center pb-6">
                {navItems.map((item) => (
                  <li
                    className={`font-light text-xl px-5 transition duration-500 hover:underline ${onEvents ? 'text-blood-500 hover:text-blood-500' : 'text-gold-500 hover:text-gold-400'} `}
                    key={item.name}
                  >
                    <Link href={item.url}>{t(`${item.name}`)}</Link>
                  </li>
                ))}
                <LanguageSwitcher />
              </ul>

              <div className="flex justify-end">
                <div className={`lg:hidden ${onEvents ? 'text-blood-500' : 'text-gold-500'}`}>
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
              <div className="lg:mx-48 md:mx-20 mx-2">
                <a
                  className="flex justify-center text-xl text-white font-bold leading-relaxed py-2 whitespace-no-wrap uppercase"
                  href="/"
                >
                  <img alt="logo" src={`${onEvents ? '/logo_events.png' : '/logo.png'}`} />
                  {/* <Image src={`${onEvents ? '/logo_events.png' : '/logo.png'}`} width={600} height={155} /> */}
                </a>
              </div>
            </nav>
          </Container>
        </div>
      </div>
    </>
  );
}
