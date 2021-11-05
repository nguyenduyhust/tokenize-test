import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAppSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  setupAppSwagger(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
