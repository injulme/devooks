import Header from '@/components/layout/header';

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-screen-xl px-12">{children}</section>
    </>
  );
}
