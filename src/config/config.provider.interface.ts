import { BaseLogger } from 'pino'

export interface ConfigProviderInterface {
  listenHost(): string
  listenPort(): number
  dsn(): string
  dsnProtocol(): string
  getProtocol(d: string): string
  getEnvironment(): string
  allowedCorsDomains(): string
  logger(): BaseLogger
  basicAuthUsername(): string
  basicAuthPassword(): string
}