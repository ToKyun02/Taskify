'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelDashboardInvitation, createDashboard, deleteDashboard, getDashboardDetails, getDashboardInvitations, getDashboards, inviteDashboard, updateDashboard } from '.';
import { DashboardFormType } from './types';
import { DEFAULT_COLOR } from '@/constants/colors';

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

export const useDashboardQuery = (id: number) => {
  return useQuery({
    queryKey: ['dashboard', id],
    queryFn: () => getDashboardDetails(id),
  });
};

export const useDashboardInvitationsQuery = (id: number, page: number, size: number) => {
  return useQuery({
    queryKey: ['dashboard', id, 'invitations', page, size],
    queryFn: () => getDashboardInvitations(id, { page, size }),
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

  const update = useMutation({
    mutationFn: ({ id, title, color }: { id: number; title: string; color: DEFAULT_COLOR }) => {
      return updateDashboard(id, { title, color });
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => {
      return deleteDashboard(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });

  const invite = useMutation({
    mutationFn: ({ id, email }: { id: number; email: string }) => {
      return inviteDashboard(id, { email });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', id, 'invitations'] });
    },
  });

  const cancel = useMutation({
    mutationFn: ({ dashboardId, invitationId }: { dashboardId: number; invitationId: number }) => {
      return cancelDashboardInvitation(dashboardId, invitationId);
    },
    onSuccess: (_, { dashboardId }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', dashboardId, 'invitations'] });
    },
  });

  return {
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
    invite: invite.mutateAsync,
    cancel: cancel.mutateAsync,
  };
};
