import { Field, InputType } from '@nestjs/graphql';
import { DynamicVariable } from 'src/customized/types/dynamic-variable';

@InputType()
export class CreateReconciliationInput {
  @Field({ nullable: true })
  description?: string;

  @Field(() => [DynamicVariable])
  dynamicVariables: DynamicVariable[];
}
