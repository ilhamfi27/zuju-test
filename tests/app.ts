import HttpHandler from '../src/app/rest';
import { ConfigProvider } from '../src/config/config.provider';
import DomainManager from '../src/domain/domain.manager';
import SQLConnection from '../src/infrastructure/sql/driver/connection';

const configProvider = new ConfigProvider()
const domainManager = new DomainManager(configProvider)
const h = new HttpHandler(domainManager, configProvider)

export const dbConn = SQLConnection(configProvider);
