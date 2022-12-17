import HttpHandler from "../app/rest";
import { ConfigProvider } from "../config/config.provider";
import DomainManager from "../domain/domain.manager";
import { migrate } from "../infrastructure/sql/driver/migration";

const configProvider = new ConfigProvider()
const domainManager = new DomainManager(configProvider)
const h = new HttpHandler(domainManager, configProvider)

if (process.argv[2] === 'serve') {
  h.serve()
}

if (process.argv[2] === 'migrate') {
  const argv = process.argv
  argv.splice(0, 3)
  migrate(configProvider)(...argv)
}
