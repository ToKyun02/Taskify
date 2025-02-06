import authStore from '@/stores/authStore';
import { useEffect, useState } from 'react';

export default function useAuthStore() {
  const store = authStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : { accessToken: null, setAccessToken: () => {}, clearAccessToken: () => {} };
}
