import { Fragment } from 'react';

import Category from '@/app/main/_components/Category';

import Header from '@/components/layout/header';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <section className="grid grid-cols-5 gap-4 px-12 py-10">
        <Category />
        <div className="col-span-4">{children}</div>
      </section>
    </Fragment>
  );
}
