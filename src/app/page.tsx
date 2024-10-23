import Home from './_home/home';

import { Fragment } from 'react';

import Header from '@/components/layout/header';

export default function Main() {
  return (
    <Fragment>
      <Header />
      <main className="mb-12 flex flex-col space-y-8">
        <Home />
      </main>
    </Fragment>
  );
}
