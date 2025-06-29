import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

// Excluded from Swagger UI documentation
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiExcludeEndpoint()
	getHello(): string {
		return this.appService.getHello();
	}
}
