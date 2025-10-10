import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  }); // Enable detailed logs

  const frontendUrl = process.env.FRONTEND_URL;

  app.enableCors({ origin: frontendUrl, credentials: true });

  await app.listen(5001, '0.0.0.0');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
