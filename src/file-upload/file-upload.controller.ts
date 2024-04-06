import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";

import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";
import { PresignedUrlFileDto, PresignedUrlResponse } from "@/file-upload/file-upload.dtos";

import { FileUploadService } from "./file-upload.service";

@UseInterceptors(ResponseTransformInterceptor)
@Controller("file-upload")
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  getPresignedUrl(@Body() fileUploadDto: PresignedUrlFileDto): Promise<PresignedUrlResponse[]> {
    return this.fileUploadService.getPresignedUrl(fileUploadDto);
  }
}
