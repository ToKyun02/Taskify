import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = new NextResponse(null, { status: 204 });

  response.cookies.delete('accessToken');
  return response;
};
