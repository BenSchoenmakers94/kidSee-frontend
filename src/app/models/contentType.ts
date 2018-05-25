import { Attribute, JsonApiModel, JsonApiModelConfig } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'content-types'
})
export class ContentType extends BaseModel {
  @Attribute()
  name: string;

  @Attribute()
  description: string;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'name', required: true }, { name: 'description', required: true }];
  public hasManyAttributes = [];
  public belongsToAttributes = [];
  public manyToManyAttributes = [];
}
