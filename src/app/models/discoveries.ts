import { JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';
import { Assignment } from './assignment';

@JsonApiModelConfig({
  type: 'discoveries'
})

export class Discovery extends BaseModel {

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @HasMany()
  assignments: Assignment[];

  public simpleAttributeNames = [{ name: 'Id', required: true }, { name: 'Name', required: true }];
  public hasManyAttributes = [];
  public belongsToAttributes = [];
  public manyToManyAttributes = [{ name: 'Assignments', required: false }];
}
