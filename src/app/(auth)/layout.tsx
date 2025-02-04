function Header() {
  //TODO: Header 레이아웃 작업
  return <header></header>;
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
