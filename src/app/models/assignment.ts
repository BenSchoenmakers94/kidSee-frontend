import { Attribute, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi';
import { AssignmentType } from './assignmentType';
import { Location } from './location';
import { AnswerType } from './answerType';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'assignments'
})
export class Assignment extends BaseModel {

  @Attribute()
  name: String;

  @Attribute()
  description: String;

  @BelongsTo()
  'assignment-type': AssignmentType;

  @BelongsTo()
  'answer-type': AnswerType;

  @BelongsTo()
  location: Location;

  @Attribute()
  content: String;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'content', required: true }
    , { name: 'name', required: true }, { name: 'description', required: true }];
  public belongsToAttributes = [{ name: 'assignment-type', required: true }, { name: 'answer-type', required: true },
    { name: 'location', required: true }];
  public manyToManyAttributes = [];
  public hasManyAttributes = [];

}
