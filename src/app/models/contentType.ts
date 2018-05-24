import { Attribute, JsonApiModel, JsonApiModelConfig } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'contentTypes'
})
export class ContentType extends BaseModel {
  @Attribute()
  name: string;

  @Attribute()
  description: string;
}
