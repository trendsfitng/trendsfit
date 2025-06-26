import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/lib/routes';
import { BRAND_NAME, INSTAGRAM, TWITTER } from '@/utils/constants';
import NewsletterSignUp from './forms/newsletter-sign-up.form';
import SvgIcon from './icon';
import { IconName } from '@/types/icon.type';
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
const quickLinks = [
  { href: routes.about(), label: 'About Us' },
  { href: routes.contact(), label: 'Contact' },
  {
    label: 'Posts',
    href: routes.contact(),
  },
];

const Footer = () => {
  return (
    <footer className="app-padding bg-primary text-app-white py-16 px-8 md:px-14">
      <div className="flex flex-wrap xs:[&>*]:min-w-40 gap-10 justify-between ">
        <div>
          <Link href={routes.home()}>
            <div className="relative w-40 md:w-48 h-8 md:h-10 ">
              <Image
                src="/assets/logo-white.png"
                alt="trendsfit logo"
                fill
                sizes="100%"
                className="object-contain object-left-top"
              />
            </div>
          </Link>

          <div className="max-w-80 mt-8">
            <p className="text-a-16">
              Style, beauty, travel, and real-life inspo— Trendsfits brings you
              curated looks, lifestyle tips, and stunning photography, all with
              a touch of everyday luxury.
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold text-app-white mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3">
            {quickLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-app-white/80 hover:text-tertiary transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex-1 max-w-[500px]">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-sm text-app-white/80 mb-4">
            Subscribe to our newsletter for the latest news, insights, and
            exclusive offers.
          </p>
          <NewsletterSignUp />

          <div className="flex gap-5">
            {socials.map(({ route, label, icon }) => (
              <Link
                href={route}
                key={label}
                aria-label={label}
                className="hover:text-tertiary transition-colors duration-200"
                target="_blank"
              >
                <SvgIcon
                  name={icon}
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-app-white/80">
        <p>
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
        <p className="mt-2">
          Powered by{' '}
          <Link
            href="https://tonnipaul.com"
            className="font-semibold hover:underline"
          >
            TonniPaul Inc.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
