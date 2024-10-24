import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('DynamicVariableType')
export class DynamicVariable {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  value?: string;
}
