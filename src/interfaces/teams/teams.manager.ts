import Context from "../../context"
import { Teams } from "./teams"

export default interface TeamsManager {
  getAll(context: Context, fixture_id: string): Promise<Teams[]>
  get(context: Context, fixture_id: string, id: string): Promise<Teams>
  createOrUpdate(context: Context, fixture_id: string, data: Teams): Promise<Teams>
}
