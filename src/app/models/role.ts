import {JsonApiModelConfig, Attribute, JsonApiModel } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'roles'
})

export class Role extends JsonApiModel {

  @Attribute()
  name: string;
}