import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/customized/schema/base';

export type ReconciliationSourceDocument = ReconciliationSource & Document;

@Schema()
export class ReconciliationSource extends Base {
  @Prop({ required: true })
  description: string;
}

export const ReconciliationSourceSchema =
  SchemaFactory.createForClass(ReconciliationSource);
