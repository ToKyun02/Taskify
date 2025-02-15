'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelDashboardInvitation, createDashboard, deleteDashboard, getDashboardDetails, getDashboardInvitations, getDashboards, inviteDashboard, updateDashboard } from '.';
import { CancelInviteDashboardRequest, CreateDashboardRequest, Dashboard, GetDashboardInvitationsRequest, GetDashboardsRequest, InviteDashboardRequest, UpdateDashboardRequest } from './types';

export const useDashboardsQuery = (params: GetDashboardsRequest) => {
  return useQuery({
    queryKey: ['dashboards', params],
    queryFn: () => getDashboards(params),
  });
};

export const useDashboardQuery = (id: Dashboard['id']) => {
  return useQuery({
    queryKey: ['dashboard', id],
    queryFn: () => getDashboardDetails(id),
  });
};

export const useDashboardInvitationsQuery = (params: GetDashboardInvitationsRequest) => {
  const { id, ...rest } = params;
  return useQuery({
    queryKey: ['invitations', id, rest],
    queryFn: () => getDashboardInvitations(params),
  });
};

export const useCreateDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDashboardRequest) => {
      return createDashboard(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });
};

export const useUpdateDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateDashboardRequest) => {
      return updateDashboard(params);
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', id] });
    },
  });
};

export const useRemoveDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Dashboard['id']) => {
      return deleteDashboard(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });
};

export const useInviteDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: InviteDashboardRequest) => {
      return inviteDashboard(params);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitations', id] });
    },
  });
};

export const useCancelInviteDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CancelInviteDashboardRequest) => {
      return cancelDashboardInvitation(params);
    },
    onSuccess: (_, { dashboardId }) => {
      queryClient.invalidateQueries({ queryKey: ['invitations', dashboardId] });
    },
  });
};
