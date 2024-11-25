import { useGetWishlist } from '@/services/wishlist/hooks/useGetWishlist';

import BookContainer from '@/components/ebook/book-container';

export default function Wishlist() {
  const { data } = useGetWishlist();

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.data.map((ebook) => {
        return <BookContainer bookData={ebook} key={ebook.id} />;
      })}
    </div>
  );
}
