import { GrafanaUserRole } from 'shared/constants/grafana-user-role.enum';

export interface IGrafanaUser {
  orgId: any,
  userId: any,
  email: string,
  name: string,
  avatarUrl: string,
  login: string,
  role: GrafanaUserRole,
  lastSeenAt: string
  lastSeenAtAge: string
}
