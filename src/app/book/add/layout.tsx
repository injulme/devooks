export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="px-12 py-10">{children}</section>;
}
