import SQLConnection from "./connection"

export const migrate = (c) => async (...param: string[]) => {
  const dbClient = SQLConnection(c)
  try {
    if (param[0] === 'rollback') await dbClient.migrate.rollback()
    else await dbClient.migrate.latest()
    dbClient.destroy()
  } catch (err) {
    c.logger().error({
      err
    })
  }
  process.exit()
}