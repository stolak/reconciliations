import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Base } from 'src/customized/schema/base';
import { DynamicVariable } from 'src/customized/types/dynamic-variable';

export type ReconciliationSourceDocument = ReconciliationSource & Document;

@ObjectType({ implements: [Base] })
@Schema({ timestamps: true })
export class ReconciliationSource extends Base {
  @Field()
  @Prop({ required: true })
  id: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field(() => [DynamicVariable])
  @Prop()
  dynamicVariables: DynamicVariable[];

  @Field()
  @Prop({ required: true })
  comparismDetails: string;

  @Field({ nullable: true })
  @Prop()
  matchId?: string[];

  @Field({ nullable: true })
  @Prop()
  status?: boolean;
}

export const ReconciliationSourceSchema =
  SchemaFactory.createForClass(ReconciliationSource);
