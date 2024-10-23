export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="mx-auto max-w-screen-xl px-12 py-10">{children}</section>;
}
