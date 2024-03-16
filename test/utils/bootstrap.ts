import { ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { MikroORM } from "@mikro-orm/postgresql";

import { AppModule } from "@/app.module";
import ormConfig from "@/db/db.config";

export const bootstrapTestServer = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const httpServer = app.getHttpServer();
  const orm = await MikroORM.init(ormConfig);
  const entityManager = orm.em.fork();
  await app.init();

  return {
    appInstance: app,
    httpServerInstance: httpServer,
    dbServiceInstance: entityManager,
    ormInstance: orm,
  };
};
