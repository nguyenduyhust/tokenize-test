import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const setupAppSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Tokenize developer test')
    .setDescription('Tokenize developer test')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
  });

  SwaggerModule.setup('api/doc', app, document);
};
