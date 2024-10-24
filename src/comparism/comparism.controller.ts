import { Controller, Post, Body } from '@nestjs/common';
import { ComparismService } from './comparism.service';
import { CreateReconciliationInput } from './inputs/create-reconciliation-input';
import { ReconciliationSource } from './reconciliation-source.schema';

interface inputType {
  record1: string;
  record2: string;
}

@Controller('compare')
export class ComparismController {
  constructor(private readonly comparismService: ComparismService) {}

  @Post('create')
  async create(
    @Body() input: CreateReconciliationInput,
  ): Promise<ReconciliationSource> {
    return this.comparismService.create(input);
  }

  @Post('single')
  async compare(
    @Body('record1') record1: string,
    @Body('record2') record2: string,
  ): Promise<string> {
    return this.comparismService.compareRecords(record1, record2);
  }

  @Post('multiple')
  async compare2(@Body('record') record: inputType[]): Promise<string> {
    return this.comparismService.compareRecords2(record);
  }
  @Post('multiple-file')
  async compare3(
    @Body('record1') record1: inputType[],
    @Body('record2') record2: inputType[],
  ): Promise<string> {
    return this.comparismService.compareRecords3(record1, record2);
  }
}
