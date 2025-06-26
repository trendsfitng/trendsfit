'use client';

import { cn } from '@/lib/classnameMerge';
import { Category, Post } from '@/sanity.types';
import { scrollToHeading } from '@/utils/scrollToHeading';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type Advert } from './cards/advert-card';
import BlogPostCard from './cards/blog-post-card';
import NoBlogPosts from './no-blog-posts';
import Pagination from './pagination';
import ShowView from './show-view';

interface IBlogPostProps {
  categories: Category[];
  posts: (Omit<Post, 'mainImage' | 'author' | 'slug'> & {
    mainImage: { alt: string };
    author: string;
    slug: string;
  })[];
  postPerPage: number;
  total: number;
  adverts?: Advert[];
}

const BlogPostSection = ({
  categories,
  posts,
  postPerPage,
  total,
  // adverts,
}: IBlogPostProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil(total / postPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams();
    params.set('category', category);
    params.set('page', '1');

    router.push(`?category=${category}`, { scroll: false });
    scrollToHeading('blog-posts');
  };

  useEffect(() => {
    setSelectedCategory(category ?? 'all');
  }, [category]);

  console.log('Posts:', posts);

  return (
    <section
      id="blog-posts"
      className="section-padding scroll-m-20 relative flex flex-col lg:flex-row gap-10"
    >
      <div className="flex-1 w-full">
        <ShowView when={!!categories.length}>
          <div className="flex rounded flex-wrap [&>button]:py-1 [&>button]:px-5 gap-2  [&>button]:shadow-2xl  mb-10">
            <button
              className={cn(
                ' hover:bg-secondary  whitespace-nowrap bg-app-background transition-colors',
                selectedCategory === 'all' &&
                  'bg-primary hover:bg-primary text-white',
                'sticky left-0'
              )}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                className={cn(
                  'hover:bg-secondary whitespace-nowrap bg-white transition-colors',
                  selectedCategory === category.slug &&
                    'bg-primary hover:bg-primary text-white',
                  category === categories[0] && 'sticky left-0'
                )}
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </ShowView>

        <ShowView when={!!posts.length} fallback={<NoBlogPosts />}>
          <div className="flex flex-wrap gap-5">
            {posts?.map(
              ({ _id, title, excerpt, author, mainImage, slug, body }) => {
                return (
                  <BlogPostCard
                    key={_id}
                    title={title ?? ''}
                    excerpt={excerpt || ''}
                    mainImage={mainImage}
                    author={author || 'Anonymous'}
                    slug={slug}
                    body={body ?? []}
                  />
                );
              }
            )}
          </div>
        </ShowView>

        <ShowView when={totalPages > 1}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </ShowView>
      </div>

      {/* <div className="w-full max-w-[500px] lg:max-w-[300px] mx-auto [&>div]:p-5">
        <AdvertList adverts={adverts} />
      </div> */}
    </section>
  );
};

export default BlogPostSection;
