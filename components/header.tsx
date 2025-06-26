'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SvgIcon from './icon';
import Search from './search';
import ShowView from './show-view';

import { cn } from '@/lib/classnameMerge';
import { routes } from '@/lib/routes';
import Image from 'next/image';
import { IconName } from '@/types/icon.type';
import { INSTAGRAM, TWITTER } from '@/utils/constants';

interface SocialLink {
  route: string;
  label: string;
  icon: IconName;
}

export const socials: SocialLink[] = [
  // { route: FACEBOOK, label: 'Facebook', icon: 'facebook' },
  { route: INSTAGRAM, label: 'Instagram', icon: 'instagram' },
  { route: TWITTER, label: 'X (Twitter)', icon: 'twitter' },
  // { route: TIKTOK, label: 'TikTok', icon: 'tiktok' },
];

const navItems = [
  {
    label: 'Home',
    route: routes.home(),
  },
  {
    label: 'Posts',
    route: routes.posts(),
    newTab: true,
  },
  {
    label: 'About Us',
    route: routes.about(),
  },
  {
    label: 'Contact',
    route: routes.contact(),
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isActive = (route: string) => {
    return route === '/' ? pathname === route : pathname.startsWith(route);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'revert';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 left-0 w-screen shadow-lg bg-white z-10 py-6">
      <nav className="app-padding flex w-full justify-between items-center">
        <Link href={routes.home()}>
          <div className="relative w-40 h-8">
            <Image
              src="/assets/logo.png"
              alt="tales of style logo"
              fill
              sizes="100%"
              className="object-contain object-left-top"
            />
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <ShowView when={isOpen}>
            <div
              className="fixed h-lvh w-screen bg-primary/[.3] top-0 left-0 lg:hidden z-10 "
              onClick={handleIsOpen}
            />
          </ShowView>

          <Search isDesktop />

          <div
            className={cn(
              `flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 w-0 overflow-hidden max-w-[500px] bg-app-foreground lg:w-max fixed h-lvh lg:h-auto top-0 left-0 lg:relative max-lg:p-5 lg:p-[auto] lg:translate-x-0 z-20 transition-transform `,
              isOpen ? 'translate-x-0 w-full' : 'translate-x-[-100%]'
            )}
          >
            <button
              className="flex lg:hidden mb-10 ml-auto"
              onClick={handleIsOpen}
            >
              <SvgIcon name="close" className="w-6 h-6" />
            </button>

            <ul className="flex flex-col lg:flex-row lg:gap-10 mb-10 lg:m-0 lg:items-center  lg:justify-center ">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b lg:border-none mt-1 lg:mb-0 pt-4 lg:pt-0 pb-5 lg:pb-0"
                >
                  <Link
                    href={item.route}
                    className={cn(
                      'hover:border-primary border-b',
                      `${isActive(item.route) && 'text-primary font-medium hover:!text-primary'}`
                    )}
                    target={item.newTab ? '_blank' : ''}
                  >
                    <p>{item.label}</p>
                  </Link>
                </li>
              ))}
            </ul>

            {/* <div className="flex gap-5">
              {socials.map(({ route, label, icon }) => (
                <Link
                  href={route}
                  key={label}
                  aria-label={label}
                  className="hover:text-tertiary transition-colors duration-200"
                  target="_blank"
                >
                  <SvgIcon
                    name={icon as IconName}
                    className="w-7 h-7 hover:scale-110 transition-transform"
                  />
                </Link>
              ))}
            </div> */}
          </div>
        </div>

        <div className="flex  items-center gap-3 lg:hidden">
          <Search />
          <button
            className="text-primary"
            aria-label="Open mobile menu"
            onClick={handleIsOpen}
          >
            <SvgIcon name="menu" className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
