import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './api/app.controller';
import { AppService } from './application/services/app.service';
import { CustomersModule } from 'src/customers/customers.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [
    CustomersModule,
    AccountsModule,
    TransactionsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
