import { Generic } from "../global"

export enum MatchStatus {
  FIXTURE = 'FIXTURE',
  PLAYED = 'PLAYED'
}

export interface Fixtures extends Generic {
  tournament_name: string
  match_status: MatchStatus
  match_datetime: Date
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
