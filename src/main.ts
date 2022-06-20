import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('RBAC auth api')
        .setDescription('RBAC administrator')
        .setVersion('1.0.0')
        .addTag('LuckyBot')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
