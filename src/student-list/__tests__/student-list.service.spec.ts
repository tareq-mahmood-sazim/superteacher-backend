import { Test, TestingModule } from "@nestjs/testing";

import { StudentListRepository } from "../student-list.repository";
import { StudentListService } from "../student-list.service";

describe("StudentListService", () => {
  let service: StudentListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentListService,
        {
          provide: StudentListRepository,
          useValue: {
            createStudent: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentListService>(StudentListService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
