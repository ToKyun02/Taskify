export interface User {
  nickname: string;
  email: string;
  id: number;
}

export interface Dashboard {
  title: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: User;
  teamId: string;
  dashboard: Dashboard;
  invitee: User;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationsResponse {
  invitations: Invitation[];
  nextPage?: number;
}
