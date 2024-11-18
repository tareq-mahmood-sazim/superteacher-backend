import { Controller, Post, Body, Get } from "@nestjs/common";

import { SendMailerAppDto } from "./dto/send-mailer-app.dto";
import { MailerAppService } from "./mailer-app.service";

@Controller("mailer-app")
export class MailerAppController {
  constructor(private readonly mailerAppService: MailerAppService) {}

  // todo -> remove post controller to restrict direct email service access
  // currently active for testing purpose
  @Post()
  sendMail(@Body() createMailerAppDto: SendMailerAppDto) {
    return this.mailerAppService.sendMail(createMailerAppDto);
  }
  @Get()
  health() {
    return "OK";
  }
}
