import { Test, TestingModule } from "@nestjs/testing";

import { TeacherListController } from "../teacher-list.controller";
import { TeacherListService } from "../teacher-list.service";

describe("TeacherListController", () => {
  let controller: TeacherListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherListController],
      providers: [TeacherListService],
    }).compile();

    controller = module.get<TeacherListController>(TeacherListController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
