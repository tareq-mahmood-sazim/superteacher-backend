import { Injectable } from "@nestjs/common";

import { S3Service } from "@/common/aws/s3-service/s3-service";
import { PresignedUrlFileDto } from "@/file-uploads/file-uploads.dtos";

@Injectable()
export class FileUploadsService {
  constructor(private readonly s3Service: S3Service) {}

  getPresignedUrl(fileUploadDto: PresignedUrlFileDto) {
    return Promise.all(
      fileUploadDto.files.map(async (file) => {
        const { name, type } = file;
        const signedUrl = await this.s3Service.getPresignedUrl(name, type);
        return { name, type, signedUrl };
      }),
    );
  }
}
