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
}
