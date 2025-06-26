'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { BlogPostCardProps } from './cards/blog-post-card';
import SvgIcon from './icon';
import NoBlogPosts from './no-blog-posts';
import ShowView from './show-view';

import { routes } from '@/lib/routes';
import { urlFor } from '@/sanity/lib/image';

import 'swiper/css';

interface HeroProps {
  posts: BlogPostCardProps[];
}

const NavButton = ({ direction }: { direction: 'next' | 'prev' }) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        if (direction === 'next') swiper.slideNext();
        else swiper.slidePrev();
      }}
      className={`
            absolute top-1/2 transform -translate-y-1/2 z-10 
            bg-primary text-white p-2 rounded-full 
            ${direction === 'next' ? 'right-4 animate-pulse-right' : 'left-4 animate-pulse-left'}
            transition-opacity hover:opacity-80 focus:opacity-80
         `}
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
    >
      <SvgIcon
        name="arrow-right"
        className={`w-5 h-5 ${
          direction === 'prev' ? 'rotate-180' : ''
        } transition-transform`}
      />
    </button>
  );
};

const Pagination = ({ totalSlides }: { totalSlides: number }) => {
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!swiper) return;

    const handleSlideChange = () => setActiveIndex(swiper.realIndex);

    swiper.on('slideChange', handleSlideChange);

    setActiveIndex(swiper.realIndex);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper]);

  if (totalSlides <= 1) {
    return null;
  }

  return (
    <div className="flex relative w-full app-padding bottom-8 left-0 z-1 mt-5 space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => swiper.slideTo(index)}
          className={`w-4 h-2 rounded border ${
            index === activeIndex
              ? 'bg-primary border-gray-300'
              : 'bg-gray-300 bo'
          } transition-colors`}
          aria-label={`slide ${index}`}
        />
      ))}
    </div>
  );
};

const Hero = ({ posts }: HeroProps) => {
  if (!posts.length) {
    return (
      <div className="section-padding ">
        <NoBlogPosts />
      </div>
    );
  }
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      <ShowView when={posts.length > 1}>
        <NavButton direction="prev" />
        <NavButton direction="next" />
      </ShowView>

      <div className="relative ">
        {posts?.map(({ title, mainImage, excerpt, slug }, i) => (
          <SwiperSlide key={i}>
            <section className="section-padding min-h-[80vh] grid align-baseline">
              <div className="absolute top-0 left-0 -z-1 w-full min-h-screen">
                <Image
                  src={urlFor(mainImage).url()}
                  alt={mainImage.alt}
                  sizes="100%"
                  fill
                  className="object-cover brightness-[0.3] bg-primary/80 opacity-95"
                  priority
                />
              </div>

              <div className="p-10 max-w-[500px] self-end bg-white border border-white/20 shadow-lg ">
                <p className="text-a-18 lg:text-a-40 first-letter:uppercase line-clamp-1 font-app-font-ii">
                  {title}
                </p>

                <p className="line-clamp-4 my-2  ">{excerpt}</p>

                <Link
                  href={routes.post(slug)}
                  className="text-primary w-max flex gap-3 items-center mt-5"
                >
                  Read now
                  <span>
                    <SvgIcon name="arrow-right" className="w-5 h-5" />
                  </span>
                </Link>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </div>

      <Pagination totalSlides={posts.length} />
    </Swiper>
  );
};

export default Hero;
