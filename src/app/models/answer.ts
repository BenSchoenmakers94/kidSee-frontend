import { Attribute, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi';
import { Assignment } from './assignment';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'answers'
})
export class Answer extends BaseModel {

  @Attribute()
  answer: String;

  @Attribute({ serializedName: 'correct-answer' })
  'correct-answer': Boolean;

  @BelongsTo()
  assignment: Assignment;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'answer', required: true }
    , { name: 'correct-answer', required: true }];
  public belongsToAttributes = [{ name: 'assignment', required: true }];
  public manyToManyAttributes = [];
  public hasManyAttributes = [];

}
