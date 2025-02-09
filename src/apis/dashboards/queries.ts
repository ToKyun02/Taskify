'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDashboard, getDashboards } from '.';
import { DashboardFormType } from './types';

export const useDashboardsQuery = (page: number, size: number) => {
  return useQuery({
    queryKey: ['dashboards', page, size],
    queryFn: () =>
      getDashboards({
        page,
        size,
        navigationMethod: 'pagination',
      }),
  });
};

export const useDashboardMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: DashboardFormType) => {
      return createDashboard(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });

  // TODO : update query 작성
  const update = () => {};

  // TODO : remove query 작성
  const remove = () => {};

  return {
    create: create.mutateAsync,
    update,
    remove,
  };
};
