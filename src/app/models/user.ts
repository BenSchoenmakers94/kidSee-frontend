import { JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
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

  @HasMany()
  posts: Post[];

  @Attribute({serializedName: 'username'})
  name: string;

  @Attribute({serializedName: 'inserted-at'})
  insertedAt: Date;

  public simpleAttributeNames = [{ name: 'Id', required: true }, { name: 'name', required: true },
    { name: 'Password', required: true }, { name: 'Email', required: true }, { name: 'Birthdate', required: true },
    { name: 'School', required: true }, { name: 'Postal_code', required: false }, { name: 'Avatar', required: false }];
  public hasManyAttributes = [{ name: 'Posts', required: false }];
  public belongsToAttributes = [];
  public manyToManyAttributes = [];
}
