import { Logger, MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AuthModule } from "./auth/auth.module";
import { AppLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { validate } from "./common/validators/env.validator";
import ormConfig from "./db/db.config";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { WebsocketExampleModule } from "./websocket-example/websocket-example.module";

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),

    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      validate,
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    FileUploadModule,
    WebsocketExampleModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
