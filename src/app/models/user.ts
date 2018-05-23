import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';
import { Post } from './post';
import { BaseModel } from './baseModel';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material';

@JsonApiModelConfig({
  type: 'users'
})
export class User extends BaseModel {

  @Attribute()
  username: string;

  @Attribute()
  password: string;

  @Attribute()
  email: string;

  @Attribute()
  birthdate: Date;

  @Attribute()
  school: string;

  @Attribute({serializedName: 'postal-code'})
  postal_code: string;

  @Attribute()
  avatar: string;

  @HasMany()
  posts: Post[];

  public simpleAttributeNames = ['Id', 'Username', 'Email', 'Birthdate', 'School', 'Postal_code', 'Avatar'];
  public hasManyAttributes = ['Posts'];
  public belongsToAttributes = [];
}
