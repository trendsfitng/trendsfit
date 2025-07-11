import { Metadata } from 'next';
import Image from 'next/image';

import PortableText from '@/components/portable-text';

import { sanityFetch } from '@/sanity/lib/fetch';
import { aboutUsQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'About us',
  description: `Style, beauty, travel, and real-life inspo— Trendsfits brings you curated looks, lifestyle tips, and stunning photography, all with a touch of everyday luxury.`,
};

const AboutUsPage = async () => {
  const data = await sanityFetch({ query: aboutUsQuery });

  // const content = data?.content ?? [];

  if (!data) {
    return (
      <div className="text-center py-16 px-7 rounded-lg bg-white my-10 w-max mx-auto shadow-sm">
        <p className="text-2xl font-semibold text-primary">
          There&apos;s nothing here just yet.
        </p>
        <p className="text-app-text/60 mt-2 max-w-md mx-auto">
          We&apos;re putting the final touches on our story. Check back soon to
          learn more about who we are and what we stand for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
        About Us
      </h1>
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-[100px] md:max-w-[200px] aspect-video h-10 max-sm:h-[60px]">
          <Image
            src="/assets/logo.png"
            alt="tales of style logo"
            fill
            sizes="100%"
            className={`object-contain `}
          />
        </div>
      </div>

      <section className="w-full px-4 py-8 mx-auto">
        <div className="bg-white p-6 shadow-xl">
          <PortableText value={data} />
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
