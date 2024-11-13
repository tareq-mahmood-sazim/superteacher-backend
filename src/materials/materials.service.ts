import { Injectable } from "@nestjs/common";

import { CreateMaterialDto } from "./dto/create-material.dto";
import { MaterialsRepository } from "./materials.repository";

@Injectable()
export class MaterialsService {
  constructor(private readonly materialRepository: MaterialsRepository) {}

  createAssignment(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.createAssignments(createMaterialDto);
  }
  createMaterial(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.createMaterials(createMaterialDto);
  }
  createExam(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.createExams(createMaterialDto);
  }

  findAssignmentByClassroomId(classroomId: number) {
    return this.materialRepository.findAllAssignments(classroomId);
  }
  findMaterialByClassroomId(classroomId: number) {
    return this.materialRepository.findAllMaterials(classroomId);
  }
  findExamByClassroomId(classroomId: number) {
    return this.materialRepository.findAllExams(classroomId);
  }

  deleteAssignment(assignmentId: number) {
    return this.materialRepository.deleteAssignment(assignmentId);
  }
  deleteMaterial(materialId: number) {
    return this.materialRepository.deleteMaterial(materialId);
  }
  deleteExam(examId: number) {
    return this.materialRepository.deleteExam(examId);
  }
}
