import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'assignment-types'
})
export class AssignmentType extends BaseModel {
  @Attribute()
  name: string;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'name', required: true }];
  public belongsToAttributes = [];
  public manyToManyAttributes = [];
  public hasManyAttributes = [];
}
