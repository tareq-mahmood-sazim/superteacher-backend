import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";

import { CreateMaterialDto } from "./dto/create-material.dto";
import { MaterialsService } from "./materials.service";

@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get("/:id")
  findOneMaterialById(@Param("id") id: string) {
    return this.materialsService.findMaterialById(+id);
  }
  @Post("/assignment")
  createAssignment(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.createAssignment(createMaterialDto);
  }
  @Post("/study-materials")
  createMaterials(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.createMaterial(createMaterialDto);
  }
  @Post("/schedule-exam")
  createScheduleExam(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.createExam(createMaterialDto);
  }
  @Get("/assignment/:id")
  findAllAssignment(@Param("id") id: string) {
    return this.materialsService.findAssignmentByClassroomId(+id);
  }
  @Get("/study-materials/:id")
  findAllMaterials(@Param("id") id: string) {
    return this.materialsService.findMaterialByClassroomId(+id);
  }
  @Get("/schedule-exam/:id")
  findAllScheduleExam(@Param("id") id: string) {
    return this.materialsService.findExamByClassroomId(+id);
  }
  @Delete("/delete-materials/:id")
  GetMaterials(@Param("id") id: string) {
    return this.materialsService.deleteMaterial(+id);
  }
  @Patch("/update-materials/:id")
  updateMaterials(@Param("id") id: string, @Body() updateMaterialDto: CreateMaterialDto) {
    return this.materialsService.updateMaterialById(+id, updateMaterialDto);
  }
}
