import { Test, TestingModule } from "@nestjs/testing";

import { EntityManager } from "@mikro-orm/core";

import { UniquecodeRepository } from "@/uniquecode/uniquecode.repository";

import { TeacherListRepository } from "../teacher-list.repository";
import { TeacherListService } from "../teacher-list.service";


describe("TeacherListService", () => {
  let service: TeacherListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherListService,
        {
          provide: TeacherListRepository,
          useValue: {},
        },
        {
          provide: UniquecodeRepository,
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TeacherListService>(TeacherListService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
