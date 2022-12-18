import { Generic } from "../global"

export interface Fixtures extends Generic {
  tournament_name: string
  match_status: string
  date: Date
}

export interface FixturesByDate {
  date: Date
  match_count: number
}

export interface FixturesQueryParam {
  search?: string
  sort?: string
  startDate?: string
}
