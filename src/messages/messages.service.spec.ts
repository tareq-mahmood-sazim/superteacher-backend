import { Test, TestingModule } from "@nestjs/testing";

import { MessagesRepository } from "@/websocket-example/websocket-example.repository";

import { MessagesService } from "./messages.service";

describe("MessagesService", () => {
  let service: MessagesService;
  let repository: MessagesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: MessagesRepository,
          useValue: {
            getMessageByClassroom: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    repository = module.get<MessagesRepository>(MessagesRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("should call getMessageByClassroom with the correct id", async () => {
      const id = 1;
      await service.findOne(id);
      expect(repository.getMessageByClassroom).toHaveBeenCalledWith(id);
    });
  });
});
