const home = () => '/';
const posts = () => '/posts';
const post = (slug: string) => `${posts()}/${slug}`;
const about = () => '/about';
const contact = () => '/contact';
const icons = () => '/icons';

export const routes = {
  home,
  posts,
  post,
  about,
  contact,
  icons,
};
