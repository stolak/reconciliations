import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComparismModule } from './comparism/comparism.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ComparismModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
