import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  }); // Enable detailed log

  // const frontendUrl = process.env.FRONTEND_URL;

  // app.enableCors({ origin: frontendUrl, credentials: true });
  const PORT = 5000;

  await app.listen(PORT, '0.0.0.0');
  console.log(`Server is running and listening on port ${PORT} (0.0.0.0)`);
  console.log();
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
