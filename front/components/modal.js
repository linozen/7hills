/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './language-switcher';
import { useRouter } from 'next/router';

export default function Modal({ onClose, navItems }) {
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  const { t } = useTranslation('common');
  return (
    <>
      <div
        className={`w-full h-full fixed inset-0 z-50 ${onEvents ? 'bg-rose-500' : 'bg-olive-500'}`}
        onClick={onClose}
      >
        <div className={`flex flex-row content-start items-center justify-center static w-full h-full p-10 text-center text-4xl ${onEvents ? 'text-blood-500' : 'text-gold-500'}`}>
          <ul className="">
            {navItems.map((item) => (
              <li
                className="py-4 transition duration-500 hover:text-gold-400 hover:underline"
                key={item.name}
              >
                <Link href={item.url}>
                  {t(`${item.name}`)}
                </Link>
              </li>
            ))}
            <LanguageSwitcher />
          </ul>
        </div>
      </div>
    </>
  );
}
