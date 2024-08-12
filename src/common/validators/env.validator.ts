import { plainToInstance } from "class-transformer";
import { IsNumber, IsPositive, IsString, validateSync } from "class-validator";

import { IEnvironmentVariables } from "../interfaces/environment-variables.interface";

class EnvironmentVariables implements IEnvironmentVariables {
  @IsString()
  NODE_ENV!: string;

  @IsNumber()
  @IsPositive()
  BE_PORT!: number;

  @IsNumber()
  @IsPositive()
  BE_WS_PORT!: number;

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

  @IsNumber()
  @IsPositive()
  AWS_S3_PRESIGN_URL_EXPIRY_IN_MINUTES!: number;
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
