import { Module } from '@nestjs/common';
import { ComparismController } from './comparism.controller';
import { ComparismService } from './comparism.service';
import { ComparismResolver } from './comparism.resolver';

@Module({
  controllers: [ComparismController],
  providers: [ComparismService, ComparismResolver]
})
export class ComparismModule {}
