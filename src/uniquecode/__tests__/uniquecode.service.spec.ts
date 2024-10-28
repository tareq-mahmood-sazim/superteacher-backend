import { Test, TestingModule } from "@nestjs/testing";

import { UniquecodeService } from "../uniquecode.service";

describe("UniquecodeService", () => {
  let service: UniquecodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniquecodeService],
    }).compile();

    service = module.get<UniquecodeService>(UniquecodeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
