import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";

import { Classroom } from "@/common/entities/classroom.entity";
import { MaterialsEnum } from "@/common/enums/materials.enum";

import { Materials } from "../common/entities/materials.entity";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";

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
  async findMaterialById(id: number): Promise<Materials | null> {
    const data = await this.em.findOne(Materials, id);
    return data;
  }

  async createAssignments(assignment: CreateMaterialDto) {
    if (!assignment.title || !assignment.instructions || !assignment.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const classroomId = await this.em.findOne(Classroom, {
      id: assignment.classroom,
    });
    if (!classroomId) throw new Error("Classroom not found");
    const newAssignment = new Materials();
    newAssignment.category = MaterialsEnum.ASSIGNMENT;
    newAssignment.title = assignment.title;
    newAssignment.instructions = assignment.instructions;
    newAssignment.dueDate = new Date(assignment.dueDate);
    newAssignment.attachments = assignment.attachments ?? [];
    newAssignment.classroom = classroomId;
    await this.em.persistAndFlush(newAssignment);
    return newAssignment;
  }
  async createMaterials(materials: CreateMaterialDto) {
    if (!materials.title || !materials.instructions || !materials.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const classroomId = await this.em.findOne(Classroom, { id: materials.classroom });
    if (!classroomId) throw new Error("Classroom not found");
    const newMaterials = new Materials();
    newMaterials.category = MaterialsEnum.STUDYMATERIALS;
    newMaterials.title = materials.title;
    newMaterials.instructions = materials.instructions;
    newMaterials.dueDate = new Date(materials.dueDate);
    newMaterials.attachments = materials.attachments ?? [];
    newMaterials.classroom = classroomId;
    await this.em.persistAndFlush(newMaterials);
    return newMaterials;
  }
  async createExams(exams: CreateMaterialDto) {
    if (!exams.title || !exams.instructions || !exams.dueDate) {
      throw new Error("Title, instructions, and due date are required to create an Materials.");
    }
    const classroomId = await this.em.findOne(Classroom, {
      id: exams.classroom,
    });
    if (!classroomId) throw new Error("Classroom not found");
    const newExams = new Materials();
    newExams.category = MaterialsEnum.EXAM;
    newExams.title = exams.title;
    newExams.instructions = exams.instructions;
    newExams.dueDate = new Date(exams.dueDate);
    newExams.attachments = exams.attachments ?? [];
    newExams.classroom = classroomId;
    await this.em.persistAndFlush(newExams);
    return newExams;
  }

  async updateMaterialById(id: number, updateMaterialDto: UpdateMaterialDto) {
    const updateData = await this.em.nativeUpdate(Materials, { id: id }, updateMaterialDto);
    return updateData;
  }
  async deleteMaterial(id: number) {
    const material = await this.em.findOne(Materials, id, { populate: ["submissions"] });
    if (!material) {
      throw new Error("Material not found");
    }
    await this.em.removeAndFlush(material);
    return { data: "Material and related submissions deleted successfully" };
  }
}
