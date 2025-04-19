import { Fragment } from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <section className="mx-auto max-w-screen-xl px-12 py-10">{children}</section>
      <Footer />
    </Fragment>
  );
}
