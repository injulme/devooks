import { Fragment, ReactNode } from 'react';

import Header from '@/components/layout/header';

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <section className="mx-auto max-w-screen-xl px-12 py-10">{children}</section>
    </Fragment>
  );
}
