import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";

import { CreateMaterialDto } from "./dto/create-material.dto";
import { MaterialsService } from "./materials.service";

@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post("/assignment")
  createAssignment(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.createAssignment(createMaterialDto);
  }
  @Post("/materials")
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
  @Get("/materials/:id")
  findAllMaterials(@Param("id") id: string) {
    return this.materialsService.findMaterialByClassroomId(+id);
  }
  @Get("/schedule-exam/:id")
  findAllScheduleExam(@Param("id") id: string) {
    return this.materialsService.findExamByClassroomId(+id);
  }
  @Delete("/assignment/:id")
  deleteAssignment(@Param("id") id: string) {
    return this.materialsService.deleteAssignment(+id);
  }
  @Delete("/materials/:id")
  deleteMaterials(@Param("id") id: string) {
    return this.materialsService.deleteMaterial(+id);
  }
  @Delete("/schedule-exam/:id")
  deleteScheduleExam(@Param("id") id: string) {
    return this.materialsService.deleteExam(+id);
  }
  // Todo -> implement update endpoints if required
  // @Patch("/assignment/:id")
  // updateAssignment(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
  //   return this.materialsService.updateAssignment(+id, updateMaterialDto);
  // }
  // @Patch("/materials/:id")
  // updateMaterials(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
  //   return this.materialsService.updateMaterials(+id, updateMaterialDto);
  // }
  // @Patch("/schedule-exam/:id")
  // updateScheduleExam(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
  //   return this.materialsService.updateScheduleExam(+id, updateMaterialDto);
  // }
}
