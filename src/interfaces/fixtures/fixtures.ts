import { Generic } from "../global"

export interface Fixtures extends Generic {
  tournament_name: string
  match_status: string
  date: Date
}

export interface FixturesQueryParam {
  searchBy?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
