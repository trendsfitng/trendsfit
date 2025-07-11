'use client';

import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { Advert } from './cards/advert-card';

const AdvertCard = ({
  name,
  banner,
  description,
  external_link,
  link_text,
}: Advert) => {
  const imageUrl = urlFor(banner).url();

  const InfoOverlay = (
    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-4 py-3 backdrop-blur-sm space-y-1">
      {description && (
        <p className="text-xs text-gray-200 line-clamp-2">{description}</p>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-sm md:text-base font-semibold truncate">{name}</h3>
        {external_link && link_text && (
          <span className="text-xs md:text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 transition">
            {link_text}
          </span>
        )}
      </div>
    </div>
  );

  const CardContent = (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-xl bg-white  group">
      <div className="relative w-full aspect-video max-h-[500px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="100%"
          className="object-contain transition-transform duration-500 group-hover:scale-95"
        />
        {InfoOverlay}
      </div>
    </div>
  );

  return external_link ? (
    <Link href={external_link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default AdvertCard;
