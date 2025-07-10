import { routes } from '@/lib/routes';
import { Category } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import SvgIcon from '../icon';
import { calculateReadTime } from '@/utils/calculateReadTime';
import { PortableTextBlock } from 'next-sanity';

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  mainImage: { alt: string };
  author: string;
  slug: string;
  category?: Category;
  body: PortableTextBlock[];
}

const BlogPostCard = ({
  title,
  excerpt,
  mainImage,
  slug,
  body,
}: BlogPostCardProps) => {
  return (
    <div className="relative max-w-[367px] h-full isolate flex flex-col">
      <div className="relative aspect-[14/16] w-full group overflow-hidden -z-1 shadow-lg p-5 rounded">
        <Image
          src={urlFor(mainImage).url()}
          alt={mainImage.alt}
          fill
          sizes="100%"
          className="object-cover group-hover:scale-125 transition-all ease-linear duration-200"
        />
      </div>

      <div className="bg-white p-5 shadow-sm w-[90%] -mt-14 z-1 mx-auto">
        <p className="font-bold text-a-20 md:text-a-24 flex-1 line-clamp-2 font-app-font-ii first-letter:uppercase">
          {title}
        </p>

        <p className="line-clamp-2 text-a-14">{excerpt}</p>

        <div className="flex justify-between text-a-14 gap-2 items-center flex-1">
          <Link
            href={routes.post(slug)}
            className=" italic text-primary flex font-bold gap-2 items-center mt-5"
          >
            Read now
            <span>
              <SvgIcon name="arrow-right" className="w-5 h-5" />
            </span>
          </Link>

          <small className="font-bold self-end">{`${calculateReadTime(body)} mins read`}</small>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
