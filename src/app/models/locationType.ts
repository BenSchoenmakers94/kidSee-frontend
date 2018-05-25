import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'location-types'
})
export class LocationType extends BaseModel  {

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  public simpleAttributeNames = [{ name: 'Id', required: true }, { name: 'Name', required: true },
  { name: 'Description', required: true }];
  public hasManyAttributes = [];
  public belongsToAttributes = [];
  public manyToManyAttributes = [];
}
