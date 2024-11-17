import { Injectable } from "@nestjs/common";

import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { MaterialsRepository } from "./materials.repository";

@Injectable()
export class MaterialsService {
  constructor(private readonly materialRepository: MaterialsRepository) {}

  async createAssignment(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createAssignments(createMaterialDto);
    return { statusCode: data ? 201 : 400, message: "Assignment created", data };
  }
  async createMaterial(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createMaterials(createMaterialDto);
    return { statusCode: data ? 201 : 400, message: "Material created", data };
  }
  async createExam(createMaterialDto: CreateMaterialDto) {
    const data = await this.materialRepository.createExams(createMaterialDto);
    return { statusCode: data ? 201 : 400, message: "Exam created", data };
  }

  async findAssignmentByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllAssignments(classroomId);
    return data;
  }
  async findMaterialByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllMaterials(classroomId);
    return data;
  }
  async findExamByClassroomId(classroomId: number) {
    const data = await this.materialRepository.findAllExams(classroomId);
    return data;
  }
  async findMaterialById(materialId: number) {
    const data = await this.materialRepository.findMaterialById(materialId);
    return data;
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
