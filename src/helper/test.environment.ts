import fs from 'fs';
import * as dotenv from 'dotenv';

export const testEnvironment = (file: any) => {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

export default testEnvironment