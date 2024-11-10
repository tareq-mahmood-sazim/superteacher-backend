import { Test, TestingModule } from "@nestjs/testing";

import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

describe("MessagesController", () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            findOne: jest.fn((id: number) => ({ id, content: "test message" })),
            update: jest.fn((id: number) => ({ id, content: "updated message" })),
            remove: jest.fn((id: number) => ({ id, success: true })),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findOne", () => {
    it("should return a single message", () => {
      const result = controller.findOne("1");
      expect(result).toEqual([
        {
          id: 1,
          createdAt: "2024-11-08T12:50:28.071Z",
          updatedAt: "2024-11-08T12:50:28.072Z",
          content: "one",
          senderType: "STUDENT",
          classroom: 1,
          sender: 6,
        },
      ]);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update and return the message", () => {
      const result = controller.update("1");
      expect(result).toEqual("This action updates a #1 message");
      expect(service.update).toHaveBeenCalledWith(1);
    });
  });

  describe("remove", () => {
    it("should remove the message and return success", () => {
      const result = controller.remove("1");
      expect(result).toEqual("This action removes a #1 message");
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
