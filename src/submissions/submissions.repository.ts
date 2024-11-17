import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { MailerAppService } from "@/mailer-app/mailer-app.service";

import { AssignmentSubmission } from "../common/entities/assignment-submission.entity";
import { Materials } from "../common/entities/materials.entity";
import { UserProfile } from "../common/entities/user-profiles.entity";
import { CreateSubmissionDto } from "./dto/create-submission.dto";

@Injectable()
export class SubmissionsRepository {
  constructor(
    private readonly em: EntityManager,
    private readonly mailerAppService: MailerAppService,
  ) {}

  findAllSubmissionsForMaterial(materialId: number): Promise<AssignmentSubmission[]> {
    return this.em.find(
      AssignmentSubmission,
      { materials: materialId },
      { populate: ["userProfile", "materials"] },
    );
  }

  findAllSubmissionsByUser(userId: number): Promise<AssignmentSubmission[]> {
    return this.em.find(AssignmentSubmission, { userProfile: userId }, { populate: ["materials"] });
  }

  async createSubmission(createDto: CreateSubmissionDto): Promise<AssignmentSubmission> {
    const { materialId, userId, attachment } = createDto;

    const material = await this.em.findOne(Materials, { id: materialId });
    if (!material) {
      throw new Error("Material not found");
    }

    const userProfile = await this.em.findOne(UserProfile, { id: userId });
    if (!userProfile) {
      throw new Error("User profile not found");
    }

    const isLate = new Date() > material.dueDate;

    const submission = new AssignmentSubmission();
    submission.materials = material;
    submission.userProfile = userProfile;
    submission.attachment = attachment;
    submission.isLate = isLate;
    submission.submittedAt = new Date();

    await this.em.persistAndFlush(submission);
    this.mailerAppService.sendMail({
      email: userProfile.user.email,
      subject: `You have submitted an assignment ${material.title}`,
      message: `We recieved your submission on assignment ${material.title} on ${submission.submittedAt}.`,
    });
    return submission;
  }

  async deleteSubmission(id: number): Promise<{ data: boolean }> {
    const data = await this.em.nativeDelete(AssignmentSubmission, { id });
    return { data: data !== 0 };
  }

  async updateSubmission(submissionId: number, updateData: Partial<AssignmentSubmission>) {
    const submission = await this.em.findOne(AssignmentSubmission, submissionId);
    if (!submission) {
      throw new Error("Submission not found");
    }

    Object.assign(submission, updateData);
    await this.em.persistAndFlush(submission);

    return submission;
  }
}
