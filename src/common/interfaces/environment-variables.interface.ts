export interface IEnvironmentVariables {
  NODE_ENV: string;
  DATABASE_URL: string;
  LOGGER_LOG_DIR: string;
  LOGGER_NUM_MAX_LOG_FILES: number;
  JWT_SECRET: string;
  JWT_TOKEN_LIFETIME: string;
}
