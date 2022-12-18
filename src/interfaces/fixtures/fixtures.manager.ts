import Context from "../../context"
import { Paginated, Param } from "../global"
import { Fixtures, FixturesQueryParam } from "./fixtures"

export default interface FixturesManager {
  create(context: Context, data: Fixtures): Promise<Fixtures>
  getAll(context: Context, param?: Param<FixturesQueryParam>): Promise<Paginated<Fixtures>>
  update(context: Context, id: string, data: Fixtures): Promise<Fixtures>
  delete(context: Context, id: string): Promise<void>
}
