import BlogPostSection from '@/components/blogs-post-section';

import { sanityFetch } from '@/sanity/lib/fetch';
import {
  categoriesQuery,
  postsByCategoryQuery,
  postsQuery,
} from '@/sanity/lib/queries';

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const POST_PER_PAGE = 25;

const page = async ({ searchParams }: Props) => {
  const { page = '1', category = '' } = await searchParams;

  const pageNum = parseInt(page);
  const start = (pageNum - 1) * POST_PER_PAGE;
  const end = start + POST_PER_PAGE;

  const categories = await sanityFetch({ query: categoriesQuery });

  let postsQueryToUse = postsQuery;
  const categoryId =
    category !== 'all'
      ? categories.find((cat: { slug: string }) => cat.slug === category)
          ?._id || ''
      : '';

  if (categoryId) {
    postsQueryToUse = postsByCategoryQuery;
  }

  const { posts: paginatedPosts, total } = await sanityFetch({
    query: postsQueryToUse,
    params: {
      categoryId,
      start,
      end,
    },
  });
  return (
    <>
      <BlogPostSection
        categories={categories}
        posts={paginatedPosts}
        postPerPage={POST_PER_PAGE}
        total={total}
      />
    </>
  );
};

export default page;
