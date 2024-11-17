import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { SubmissionsService } from "./submissions.service";

@Controller("submissions")
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionsService.createSubmission(createSubmissionDto);
  }

  @Get("material/:materialId")
  findSubmissionsForMaterial(@Param("materialId") materialId: number) {
    return this.submissionsService.findSubmissionsForMaterial(materialId);
  }

  @Get("user/:userId")
  findSubmissionsByUser(@Param("userId") userId: number) {
    return this.submissionsService.findSubmissionsByUser(userId);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.updateSubmission(id, updateSubmissionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.submissionsService.deleteSubmission(id);
  }
}
