import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const PORT = process.env.PORT || 3001;

	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Transaction API')
		.setDescription(
			`Comprehensive API for managing, querying, and filtering payment transactions.`
		)
		.setVersion('1.0')
		.setContact(
			'Transaction Team',
			'http://localhost:3000',
			'nicolasbaez@hotmail.es'
		)
		.addBearerAuth()
		.addBasicAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
	});

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(PORT);
}

bootstrap();
