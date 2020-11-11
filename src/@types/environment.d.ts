/* eslint-disable @typescript-eslint/naming-convention */

declare namespace NodeJS {
  export interface ProcessEnv {
    APP_SECRET: string;
    APP_API_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASS: string;
  }
}
