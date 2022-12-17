import Context from "../../context"
import { Paginated, Param } from "../global"
import { Teams, TeamsQueryParam } from "./teams"

export default interface TeamsManager {
  create(context: Context, data: Teams): Promise<Teams>
  fetch(context: Context, param?: Param<TeamsQueryParam>): Promise<Paginated<Teams>>
  update(context: Context, id: string, data: Teams): Promise<Teams>
  delete(context: Context, id: string): Promise<void>
}
