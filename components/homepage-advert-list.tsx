'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowView from './show-view';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Advert } from './cards/advert-card';
import AdvertCard from './home-page-advert-card';

const HomepageAdvertList = ({ adverts }: { adverts: Advert[] }) => {
  return (
    <div className="rounded-lg py-5 overflow-y-auto">
      <ShowView when={!!adverts.length}>
        <h2 className="text-lg font-semibold mb-4 text-app-text text-center">
          Sponsored Adverts
        </h2>

        <Swiper
          grabCursor={true}
          cubeEffect={{
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          loop
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
        >
          {adverts.map((ad, i) => (
            <SwiperSlide key={ad.banner + i} className="">
              <AdvertCard
                name={ad.name}
                banner={ad.banner}
                external_link={ad.external_link}
                link_text={ad.link_text}
                description={ad.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowView>
    </div>
  );
};

export default HomepageAdvertList;
