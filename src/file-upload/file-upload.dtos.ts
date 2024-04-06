import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { allowedMimeTypes } from "./file-upload.constants";

export class PresignedUrlFile {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(allowedMimeTypes)
  type!: string;
}

export class PresignedUrlFileDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PresignedUrlFile)
  files!: PresignedUrlFile[];
}

export class PresignedUrlResponse extends PresignedUrlFile {
  signedUrl!: string;
}
