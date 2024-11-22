import { Test, TestingModule } from "@nestjs/testing";

import { Classroom } from "@/common/entities/classroom.entity";
import { Materials } from "@/common/entities/materials.entity";
import { MaterialsEnum } from "@/common/enums/materials.enum";

import { MaterialsRepository } from "./materials.repository";
import { MaterialsService } from "./materials.service";

describe("MaterialsService", () => {
  let service: MaterialsService;
  let materialsRepository: MaterialsRepository;

  beforeEach(async () => {
    const mockRepository = {
      createMaterials: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialsService,
        {
          provide: MaterialsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
    materialsRepository = module.get<MaterialsRepository>(MaterialsRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createMaterial", () => {
    it("should return success when material is created", async () => {
      // Arrange
      const createMaterialDto = {
        title: "Test Material",
        instructions: "Test instructions",
        dueDate: "2024-11-20T10:00:00.000Z",
        attachments: ["file1.pdf", "file2.png"],
        classroom: 1,
        category: MaterialsEnum.STUDYMATERIALS,
        createdAt: new Date("2024-11-20T10:00:00.000Z"),
        updatedAt: new Date("2024-11-20T10:00:00.000Z"),
      };
      const mockData = new Materials();
      const classroomMock = new Classroom();
      mockData.title = createMaterialDto.title;
      mockData.instructions = createMaterialDto.instructions;
      mockData.dueDate = new Date(createMaterialDto.dueDate);
      mockData.attachments = createMaterialDto.attachments;
      mockData.category = createMaterialDto.category;
      mockData.createdAt = createMaterialDto.createdAt;
      mockData.updatedAt = createMaterialDto.updatedAt;
      mockData.classroom = classroomMock;
      jest.spyOn(materialsRepository, "createMaterials").mockResolvedValue(mockData);

      const result = await service.createMaterial(createMaterialDto);

      expect(result).toEqual({
        statusCode: 201,
        message: "Material created",
        data: mockData,
      });
    });

    it("should return failure when material creation fails", async () => {
      const mockDataToFail = new Materials();
      jest.spyOn(materialsRepository, "createMaterials").mockResolvedValue(mockDataToFail);
      const createMaterialDto = {
        title: "Test Material",
        instructions: "Test instructions",
        dueDate: "2024-11-20T10:00:00.000Z",
        attachments: ["file1.pdf", "file2.png"],
        classroom: 0,
      };
      const result = await service.createMaterial(createMaterialDto);

      expect(result).toEqual({
        statusCode: 400,
        message: "Material not created",
        data: null,
      });
    });
  });
});
