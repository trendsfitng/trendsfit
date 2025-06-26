import { BRAND_NAME } from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About us',
  description: `Style, beauty, travel, and real-life inspo— Trendsfits brings you curated looks, lifestyle tips, and stunning photography, all with a touch of everyday luxury.`,
};

const AboutUsPage = () => {
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
      <p className="text-base md:text-lg  text-center mb-4 italic">
        &quot;Investing in lives - Making a difference&quot;
      </p>
      <p className="text-base md:text-lg  text-center mb-10">
        Welcome to {` ${BRAND_NAME} `} Blog, Style, beauty, travel, and
        real-life inspo— Trendsfits brings you curated looks, lifestyle tips,
        and stunning photography, all with a touch of everyday luxury.
      </p>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-secondary mb-4">
          Our Mission
        </h2>
        <p className=" text-sm md:text-base">Something here</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-secondary mb-4">
          Our Vision
        </h2>
        <p className=" text-sm md:text-base">Reach, Rescue, and Restore.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-secondary mb-4">
          Our Values
        </h2>
        <p className=" text-sm md:text-base">Something here also</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
