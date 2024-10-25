import { Fragment } from 'react';

import Header from '@/components/layout/header';

export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <section className="px-12 py-10">{children}</section>
    </Fragment>
  );
}
