'use server';

import { cache } from 'react';
import { cookies } from 'next/headers';

export const getToken = cache(async () => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || null;
});
