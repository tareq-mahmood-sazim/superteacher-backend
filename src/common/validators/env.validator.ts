import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, validateSync } from "class-validator";

import { IEnvironmentVariables } from "../interfaces/environment-variables.interface";

class EnvironmentVariables implements IEnvironmentVariables {
  @IsString()
  NODE_ENV!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  LOGGER_LOG_DIR!: string;

  @IsNumber()
  LOGGER_NUM_MAX_LOG_FILES!: number;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_TOKEN_LIFETIME!: string;
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
