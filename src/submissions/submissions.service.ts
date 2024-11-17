import { Injectable } from "@nestjs/common";

import { AssignmentSubmission } from "../common/entities/assignment-submission.entity";
import { CreateSubmissionDto } from "./dto/create-submission.dto"; // DTO for submission creation
import { SubmissionsRepository } from "./submissions.repository"; // Assuming you have this repository

@Injectable()
export class SubmissionsService {
  constructor(private readonly submissionsRepository: SubmissionsRepository) {}

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    try {
      const submission = await this.submissionsRepository.createSubmission(createSubmissionDto);
      return {
        statusCode: 201,
        message: "Submission created successfully",
        data: submission,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: "Error creating submission",
      };
    }
  }

  async findSubmissionsForMaterial(materialId: number) {
    const submissions = await this.submissionsRepository.findAllSubmissionsForMaterial(materialId);
    return submissions;
  }

  async findSubmissionsByUser(userId: number) {
    const submissions = await this.submissionsRepository.findAllSubmissionsByUser(userId);
    return submissions;
  }

  async deleteSubmission(submissionId: number) {
    await this.submissionsRepository.deleteSubmission(submissionId);
    return {
      statusCode: 200,
      message: "Submission deleted successfully",
    };
  }

  async updateSubmission(submissionId: number, updateData: Partial<AssignmentSubmission>) {
    try {
      const submission = await this.submissionsRepository.updateSubmission(
        submissionId,
        updateData,
      );
      return {
        statusCode: 200,
        message: "Submission updated successfully",
        data: submission,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: "Error updating submission",
      };
    }
  }
}
