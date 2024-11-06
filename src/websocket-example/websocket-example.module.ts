import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Message } from "@/common/entities/message.entity";

import { WebsocketExampleGateway } from "./websocket-example.gateway";

@Module({
  imports: [
    MikroOrmModule.forFeature([Message]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_TOKEN_LIFETIME,
      },
    }),
  ],
  providers: [WebsocketExampleGateway],
})
export class WebsocketExampleModule {}
