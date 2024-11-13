import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";

import { MaterialsEnum } from "@/common/enums/materials.enum";

import { Materials } from "../common/entities/materials.entity";
import { CreateMaterialDto } from "./dto/create-material.dto";

@Injectable()
export class MaterialsRepository {
  constructor(private readonly em: EntityManager) {}

  findAllMaterials(classroomId: number): Promise<Materials[]> {
    return this.em.find(
      Materials,
      { category: MaterialsEnum.STUDYMATERIALS, classroom: classroomId },
      { populate: ["submissions"] },
    );
  }
  findAllAssignments(classroomId: number): Promise<Materials[]> {
    return this.em.find(
      Materials,
      { category: MaterialsEnum.ASSIGNMENT, classroom: classroomId },
      { populate: ["submissions"] },
    );
  }
  findAllExams(classroomId: number): Promise<Materials[]> {
    return this.em.find(
      Materials,
      { category: MaterialsEnum.EXAM, classroom: classroomId },
      { populate: ["submissions"] },
    );
  }

  async createAssignments(materials: CreateMaterialDto): Promise<Materials> {
    if (!materials.title || !materials.instructions || !materials.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const newMaterials = new Materials();
    newMaterials.category = MaterialsEnum.ASSIGNMENT;
    newMaterials.title = materials.title;
    newMaterials.instructions = materials.instructions;
    newMaterials.dueDate = materials.dueDate;
    await this.em.persistAndFlush(newMaterials);
    return newMaterials;
  }
  async createMaterials(materials: CreateMaterialDto): Promise<Materials> {
    if (!materials.title || !materials.instructions || !materials.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const newMaterials = new Materials();
    newMaterials.category = MaterialsEnum.STUDYMATERIALS;
    newMaterials.title = materials.title;
    newMaterials.instructions = materials.instructions;
    newMaterials.dueDate = materials.dueDate;
    await this.em.persistAndFlush(newMaterials);
    return newMaterials;
  }
  async createExams(exams: CreateMaterialDto): Promise<Materials> {
    if (!exams.title || !exams.instructions || !exams.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const newExams = new Materials();
    newExams.category = MaterialsEnum.EXAM;
    newExams.title = exams.title;
    newExams.instructions = exams.instructions;
    newExams.dueDate = exams.dueDate;
    await this.em.persistAndFlush(newExams);
    return newExams;
  }

  async deleteAssignment(id: number): Promise<void> {
    await this.em.nativeDelete(Materials, { id: id, category: MaterialsEnum.ASSIGNMENT });
  }
  async deleteMaterial(id: number): Promise<void> {
    await this.em.nativeDelete(Materials, { id: id, category: MaterialsEnum.STUDYMATERIALS });
  }
  async deleteExam(id: number): Promise<void> {
    await this.em.nativeDelete(Materials, { id: id, category: MaterialsEnum.EXAM });
  }
}
