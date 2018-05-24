import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';
import { Post } from './post';
import { BaseModel } from './baseModel';

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

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;

  @HasMany()
  posts: Post[] = [];
}
