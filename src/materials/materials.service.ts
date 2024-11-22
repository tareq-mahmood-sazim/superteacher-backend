import { Injectable } from "@nestjs/common";

import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { MaterialsRepository } from "./materials.repository";

@Injectable()
export class MaterialsService {
  constructor(private readonly materialRepository: MaterialsRepository) {}

  async createAssignment(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createAssignments(createMaterialDto);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Assignment created" : "Assignment not created",
      data,
    };
  }
  async createMaterial(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createMaterials(createMaterialDto);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Material created" : "Material not created",
      data,
    };
  }
  async createExam(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createExams(createMaterialDto);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Exam created" : "Exam not created",
      data,
    };
  }
  async findAssignmentByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllAssignments(classroomId);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Assignment found" : "Assignment not found",
      data,
    };
  }
  async findMaterialByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllMaterials(classroomId);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Material found" : "Material not found",
      data,
    };
  }
  async findExamByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllExams(classroomId);
    return { statusCode: data ? 201 : 400, message: data ? "Exam found" : "Exam not found", data };
  }
  async findMaterialById(materialId: number) {
    const data = await this.materialRepository.findMaterialById(materialId);
    return {
      statusCode: data ? 201 : 400,
      message: data ? "Material found" : "Material not found",
      data,
    };
  }
  async updateMaterialById(materialId: number, updateClassroomDto: UpdateMaterialDto) {
    const data = await this.materialRepository.updateMaterialById(materialId, updateClassroomDto);
    return { statusCode: data ? 201 : 400, message: "Material Updated", data };
  }
  async deleteMaterial(materialId: number) {
    const data = await this.materialRepository.deleteMaterial(materialId);
    return { statusCode: data ? 201 : 400, message: "Material Deleted", data };
  }
}
