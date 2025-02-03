import { PropsWithChildren } from 'react';

export function Section({ children }: PropsWithChildren) {
  return <section className='mb-10 space-y-3'>{children}</section>;
}

export function Heading3({ children }: PropsWithChildren) {
  return <h3 className='mb-3 text-lg font-semibold'>{children}</h3>;
}

export function Paragraph({ children }: PropsWithChildren) {
  return <p className='text-md'>{children}</p>;
}

export function List({ children }: PropsWithChildren) {
  return <ul className='list-inside list-disc space-y-1 text-md'>{children}</ul>;
}

export function ListItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}
