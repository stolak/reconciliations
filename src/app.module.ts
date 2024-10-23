import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComparismModule } from './comparism/comparism.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ComparismModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://reconciliation:upcMHhKJDOAJ2qLV@cluster0.uyrrr.mongodb.net/reconciliation?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
