import axios from 'axios';
import { getToken } from '@/actions/session';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ssr용 interceptor

// getToken은 서버액션 ("use server" 지시어 사용)
// 클라이언트 사이드에서도 invoke가 가능하긴 하지만,
// 클라이언트 사이드에서 여러 컴포넌트들에서 자신들의 데이터를 불러올때(리액트쿼리) 각각 이 getToken을 함수를 불러서
// 여러번의 nextjs서버와 브라우저간의 통신이 일어난다. (next config에서 stale time을 어느정도 주면, cache hit로 처리는 가능)

// 클라이언트에서는 token을 부모의 서버컴포넌트로부터 받아와서 header에 설정해주는 방식으로
// nextjs서버로의 요청이 마운트시 한번만 일어나도록 개선 (auth provider 설정함)

// 서버사이드에서는 getToken을 react의 cache 함수로 감싸서,
// 한번의 랜더링패스에서 동일한 요청은 한번만 처리하도록 해둠 (클라이언트는 이게 무시되고, 여러번...)

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
