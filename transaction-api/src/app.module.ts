import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TransactionsModule } from './transactions/transactions.module';

@Module({
	imports: [
		HttpModule.register({}),
		ConfigModule.forRoot(),
		TransactionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
