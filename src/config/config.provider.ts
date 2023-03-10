import * as dotenv from 'dotenv';
import path from 'path';
import pino, { BaseLogger } from 'pino';
import fileExistance from '../helper/file.existance';
import testEnvironment from '../helper/test.environment';
dotenv.config();

function newLogger(): BaseLogger {
  return pino({
    name: 'zujutest',
    level: process.env.NODE_ENV === 'development' ? 'warn' : 'info',
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  });
}

export class ConfigProvider {
  l?: BaseLogger = undefined;
  constructor() {
    if (fileExistance(path.join(__dirname, '../../.env'))) {
      dotenv.config({ path: path.join(__dirname, '../../.env') });
    }
    if (
      fileExistance(path.join(__dirname, '../../.env.test')) && 
      process.env.NODE_ENV === 'test'
    ) {
      testEnvironment(path.join(__dirname, '../../.env.test'))
    }
  }
  listenHost(): string {
    return process.env.LISTEN_HOST || '127.0.0.1';
  }
  listenPort(): number {
    return Number(process.env.LISTEN_PORT) || 3000;
  }
  logger(): BaseLogger {
    if (!this.l) this.l = newLogger();
    return this.l;
  }
  dsn(): string {
    return process.env.DSN || '';
  }
  dsnProtocol(): string {
    return this.dsn().split('://')[0];
  }
  getProtocol(d: string): string {
    return d.split('://')[0];
  }
  getEnvironment(): string {
    return process.env.NODE_ENV || 'production';
  }
  allowedCorsDomains(): string {
    return process.env.ALLOWED_CORS_DOMAIN || '*';
  }
  basicAuthUsername(): string {
    return process.env.BASIC_AUTH_USERNAME || 'admin';
  }
  basicAuthPassword(): string {
    return process.env.BASIC_AUTH_PASSWORD || 'supersecretauth';
  }
}
