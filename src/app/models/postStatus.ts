import { Attribute, JsonApiModel, JsonApiModelConfig } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'postStatuses'
})
export class PostStatus extends BaseModel {
  @Attribute()
  name: string;
}
