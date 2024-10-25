import Header from '../_components/header';

import { Fragment } from 'react';

export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      <section className="mx-auto max-w-screen-xl px-12 py-10">{children}</section>
    </Fragment>
  );
}
