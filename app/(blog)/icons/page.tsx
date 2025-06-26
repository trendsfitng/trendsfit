import { Metadata } from 'next';

import IconsPage from '@/components/icons-page';

import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Icons',
};

const Icons = () => {
  if (process.env.NODE_ENV === 'production') {
    redirect(routes.home());
  }

  return <IconsPage />;
};

export default Icons;
