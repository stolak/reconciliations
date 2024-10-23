import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComparismModule } from './comparism/comparism.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UsersModule,
    ComparismModule,
    SharedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
