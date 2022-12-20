import Context from "../../context"
import { Paginated, Param } from "../global"
import { Teams, TeamsQueryParam } from "./teams"

export default interface TeamsManager {
  create(context: Context, data: Teams): Promise<Teams>
  getAll(context: Context, fixture_id: string): Promise<Teams[]>
  get(context: Context, fixture_id: string, id: string): Promise<Teams>
  update(context: Context, fixture_id: string, id: string, data: Teams): Promise<Teams>
  delete(context: Context, fixture_id: string, id: string): Promise<void>
}
