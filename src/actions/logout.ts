'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutAction = async () => {
  (await cookies()).delete('accessToken');

  revalidatePath('/');
  redirect('/');
};
