import { Generic } from "../global"

export enum TeamSide {
  HOME = 'HOME',
  AWAY = 'AWAY'
}

export interface Teams extends Generic {
  name: string
  code: string
  score: number
  team_side: TeamSide
  team_logo: string
  fixture_id: string
}

export interface TeamsQueryParam {
  searchBy?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
