import { Test, TestingModule } from "@nestjs/testing";

import sendGrid from "@sendgrid/mail";

import { SendMailerAppDto } from "./dto/send-mailer-app.dto";
import { MailerAppService } from "./mailer-app.service";

jest.mock("@sendgrid/mail");

describe("MailerAppService", () => {
  let service: MailerAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerAppService],
    }).compile();

    service = module.get<MailerAppService>(MailerAppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should send email successfully in PRODUCTION environment", async () => {
    process.env.NODE_ENV = "production";
    process.env.SENDGRID_API_KEY = "test-api-key";
    process.env.SENDGRID_VERIFIED_SENDER = "verified@example.com";

    const sendMailDto: SendMailerAppDto = {
      email: "test@example.com",
      subject: "Test Subject",
      message: "Test Message",
    };

    const mockSend = jest.spyOn(sendGrid, "send");

    const result = await service.sendMail(sendMailDto);

    expect(mockSend).toHaveBeenCalledWith({
      to: "test@example.com",
      from: "verified@example.com",
      subject: "Test Subject",
      html: "<p>Test Message</p>",
    });
    expect(result).toEqual({ message: "Email sent to test@example.com", status: 200 });
  });

  it("should return 503 in non-PRODUCTION environment", async () => {
    process.env.NODE_ENV = "development";

    const sendMailDto: SendMailerAppDto = {
      email: "test@example.com",
      subject: "Test Subject",
      message: "Test Message",
    };

    const result = await service.sendMail(sendMailDto);

    expect(result).toEqual({ message: "Email sent to test@example.com", status: 503 });
  });

  it("should handle SendGrid errors gracefully", async () => {
    process.env.NODE_ENV = "production";

    const sendMailDto: SendMailerAppDto = {
      email: "test@example.com",
      subject: "Test Subject",
      message: "Test Message",
    };

    const mockError = new Error("SendGrid API error");
    jest.spyOn(sendGrid, "send").mockRejectedValueOnce(mockError);

    const result = await service.sendMail(sendMailDto);

    expect(result).toEqual({ error: "Failed to send email: SendGrid API error" });
  });
});
