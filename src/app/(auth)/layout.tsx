export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='mx-3 flex min-h-dvh flex-col items-center justify-center gap-9 bg-gray-10'>{children}</div>;
}
