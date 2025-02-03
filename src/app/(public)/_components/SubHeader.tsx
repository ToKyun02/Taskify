export default function SubHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <header className='mb-10 border-b border-white/15 pb-10'>
      <h2 className='font-mont mb-4 text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='font-light opacity-40'>{desc}</p>
    </header>
  );
}
