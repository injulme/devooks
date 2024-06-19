import Category from '@/components/main/Category';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="grid grid-cols-5 gap-4">
      <Category />
      <div className="col-span-4">{children}</div>
    </section>
  );
}
