import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/lib/routes';

const Logo = () => {
  return (
    <Link href={routes.home()}>
      <div className="relative w-40 h-8">
        <Image
          src="/assets/trendsfit.png"
          alt="trendsfit logo"
          fill
          sizes="100%"
          className={`object-contain`}
        />
      </div>
    </Link>
  );
};

export default Logo;
