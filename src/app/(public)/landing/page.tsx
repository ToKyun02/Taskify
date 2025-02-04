'use client';

import Feature from './_components/Feature';
import Hero from './_components/Hero';
import Setting from './_components/Setting';
import SmoothScroll from './_components/SmoothScroll';

export default function LandingPage() {
  return (
    <SmoothScroll>
      <Hero />
      <Feature />
      <Setting />
    </SmoothScroll>
  );
}
