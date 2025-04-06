export type MemberRole = 'admin' | 'developer' | 'viewer'

export interface Member {
  id: string
  team_id: string
  user_id: string
  email: string
  name: string
  role: MemberRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface TeamMember extends Member {
  team_name: string
}

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'developer', label: 'Developer' },
  { value: 'viewer', label: 'Viewer' },
] as const

export const ROLE_DESCRIPTIONS = {
  admin: 'Full access to all team resources and settings',
  developer: 'Can create and manage API collections and endpoints',
  viewer: 'Can only view API collections and endpoints',
} as const 