export default function SubHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <header className='mb-10 py-20'>
      <h2 className='mb-4 font-mont text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='font-light opacity-40'>{desc}</p>
    </header>
  );
}
