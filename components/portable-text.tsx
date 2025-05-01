'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from 'next-sanity';

import Tooltip from './tooltip';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

import { urlFor } from '@/sanity/lib/image';

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="mb-2 text-3xl text-app-text font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-2 text-2xl text-app-text font-semibold">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-2 text-xl text-app-text font-semibold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-2 text-lg text-app-text font-medium">{children}</h4>
      ),
      normal: ({ children }) => (
        <p className="my-2 text-app-text">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="pl-4 border-l-4 border-gray-300 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline hover:no-underline"
        >
          {children}
        </a>
      ),
      tooltip: ({ children, value }) => (
        <Tooltip
          text={value.text || 'Tooltip'}
          trigger={
            <span className="underline decoration-dotted cursor-help">
              {children}
            </span>
          }
        />
      ),
    },
    types: {
      image: ({ value }) => {
        return (
          <div className="relative w-full max-w-[80%] mx-auto my-5 aspect-video">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'blog image'}
              fill
              sizes="100%"
            />
          </div>
        );
      },

      youtube: ({ value }) => {
        if (!value.url) return null;
        return (
          <div className="flex justify-center my-5 w-full">
            <ReactPlayer url={value.url} controls />
          </div>
        );
      },

      video: ({ value }) => {
        console.log('VALUE VIDEO', value);
        return (
          <video className="relative w-full aspect-video">
            <source src={urlFor(value).url()} type="video/mp4" />
          </video>
        );
      },

      embed: ({ value }) => {
        if (!value?.url) return null;

        return (
          <div className="my-4">
            <iframe
              src={value.url}
              title="Embedded Media"
              className="w-full aspect-video rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      },
    },
  };

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  );
}
