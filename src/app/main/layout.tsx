export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      navbar
      {children}
    </section>
  );
}
