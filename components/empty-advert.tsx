import { routes } from '@/lib/routes';
import Link from 'next/link';

const EmptyAdverts = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-7  bg-white border border-dashed border-gray-300 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold">Advertise with us</h2>
      <p className=" mt-2">
        Want to advertise with us? Reach thousands of readers daily by placing
        your ad here.
      </p>
      <Link
        href={routes.contact()}
        className="mt-4 inline-block px-5 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default EmptyAdverts;
