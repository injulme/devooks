import Link from 'next/link';

import BookBox from '@/app/main/_components/BookBox';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);
export default function Wishlist() {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {dummy.map((d) => {
        return (
          <Link href={`/book/${d}`} key={d}>
            <BookBox bookId={d} />
          </Link>
        );
      })}
    </div>
  );
}
