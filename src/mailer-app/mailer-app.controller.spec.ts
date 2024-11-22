import { Test, TestingModule } from "@nestjs/testing";

import { MailerAppController } from "./mailer-app.controller";
import { MailerAppService } from "./mailer-app.service";

describe("MailerAppController", () => {
  let controller: MailerAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerAppController],
      providers: [MailerAppService],
    }).compile();

    controller = module.get<MailerAppController>(MailerAppController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
