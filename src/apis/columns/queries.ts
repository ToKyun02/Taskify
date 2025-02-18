'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteColumn, getColumns, postColumn, putColumn } from '@/apis/columns';
import { ColumnForm } from '@/apis/columns/types';

export const useColumnsQuery = (dashboardId: number) => {
  return useQuery({
    queryKey: ['columns', dashboardId],
    queryFn: () =>
      getColumns({
        dashboardId,
      }),
  });
};

export const useColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  const post = useMutation({
    mutationFn: (data: ColumnForm) => {
      return postColumn(dashboardId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
    },
  });

  const put = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: ColumnForm }) => {
      return putColumn(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => {
      return deleteColumn(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
    },
  });
  return {
    create: post.mutateAsync,
    update: put.mutateAsync,
    remove: remove.mutateAsync,
  };
};
