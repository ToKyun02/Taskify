'use client';

import { PropsWithChildren, useEffect } from 'react';
import { axiosInstance } from '@/utils/network/axios';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthProvider({ token, children }: PropsWithChildren<{ token: string | null }>) {
  const queryClient = useQueryClient();

  // useEffect에서 헤더에 token을 넣으면(마운트후),
  // 다른 컴포넌트에서 axiosInstance로 요청을 날릴때, token이 비어있는 순간이 있어서
  // 컴포넌트 랜더링시 헤더를 설정하는 방식으로 설정(마운트전)
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }

  useEffect(() => {
    return () => {
      // 모든 쿼리 초기화
      // login, logout action 수행시, revalidatePath로 server components가 재랜더링이 일어나서 token이 바뀌긴했지만
      // react query에서 이전 데이터를 들고 있으므로,
      // authProvider가 unmount될때 리액트쿼리를 초기화 시켜줄 필음
      queryClient.clear();
    };
  }, [queryClient]);

  return <>{children}</>;
}
