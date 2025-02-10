export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex min-h-dvh flex-col items-center justify-center gap-3 bg-gray-10 px-3 py-6'>{children}</div>;
}
