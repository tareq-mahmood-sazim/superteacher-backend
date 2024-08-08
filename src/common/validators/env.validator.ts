import { plainToInstance } from "class-transformer";
import { IsString, validateSync } from "class-validator";

import { IEnvironmentVariables } from "../interfaces/environment-variables.interface";

class EnvironmentVariables implements IEnvironmentVariables {
  @IsString()
  NODE_ENV!: string;

  @IsString()
  BE_PORT!: string;

  @IsString()
  BE_WS_PORT!: string;

  @IsString()
  API_HEALTH_URL!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_TOKEN_LIFETIME!: string;

  @IsString()
  AWS_S3_REGION!: string;

  @IsString()
  AWS_S3_ENDPOINT!: string;

  @IsString()
  AWS_S3_BUCKET_NAME!: string;

  @IsString()
  AWS_S3_PRESIGN_URL_EXPIRY_IN_MINUTES!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
