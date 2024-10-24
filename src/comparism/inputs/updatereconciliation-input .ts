import { Field, InputType } from '@nestjs/graphql';
import { DynamicVariable } from 'src/customized/types/dynamic-variable';

@InputType()
export class UpdateReconciliationInput {
  @Field()
  id: string;

  @Field(() => [DynamicVariable])
  dynamicVariables: DynamicVariable[];

  @Field({ nullable: true })
  matchId?: string[];

  @Field({ nullable: true })
  status?: boolean;
}
