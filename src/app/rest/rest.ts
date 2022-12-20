import DomainManager from "../../domain/domain.manager"
import express from 'express'
import {Server, createServer} from 'http'
import { RestRouter } from "./router"
import { ConfigProviderInterface } from "../../config/config.provider.interface"
import fileExistance from "../../helper/file.existance"
import path from "path"
import * as dotenv from 'dotenv';
export default class HttpHandler {
  m: DomainManager
  configProvider: ConfigProviderInterface

  server: Server
  constructor(m: DomainManager, configProvider: ConfigProviderInterface) {
    this.m = m
    this.configProvider = configProvider
    const server = express()
    
    server.use(RestRouter(configProvider, m))
    this.server = createServer(server)
  }
  serve(): void {
    if (fileExistance(path.join(__dirname, '../../../.env'))) {
      dotenv.config({ path: path.join(__dirname, '../../../.env') })
    }
    this.server.listen(this.configProvider.listenPort(), this.configProvider.listenHost(), () => {
      this.configProvider.logger().info(`app started on ${this.configProvider.listenHost()}:${this.configProvider.listenPort()}`)
    })
  }
  configuration(): ConfigProviderInterface {
    return this.configProvider
  }
  app() {
    return this.server
  }
}