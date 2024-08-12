export interface IEnvironmentVariables {
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_TOKEN_LIFETIME: string;
  BE_PORT: number;
  BE_WS_PORT: number;
  API_HEALTH_URL: string;
  AWS_S3_REGION: string;
  AWS_S3_ENDPOINT: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_S3_PRESIGN_URL_EXPIRY_IN_MINUTES: number;
}
