import { Generic } from "../global"

export interface Teams extends Generic {
  name: string
  code: string
  score: number
  team_side: string
  team_logo: string
  fixture_id: string
}

export interface TeamsQueryParam {
  searchBy?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
