import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { User } from './user';
import { ContentType } from './contentType';
import { PostStatus } from './postStatus';
import { Comment } from './comment';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'posts'
})
export class Post extends BaseModel {

  @Attribute({serializedName: 'content'})
  subject: string;

  @Attribute()
  title: string;

  @Attribute({serializedName: 'title'})
  name: string;

  @BelongsTo()
  'content-type': ContentType;

  @BelongsTo()
  user: User;

  @BelongsTo()
  'post-status': PostStatus;

  @HasMany()
  comments: Comment[];

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'name', required: true }, { name: 'subject', required: true }];
  public hasManyAttributes = [{ name: 'comments', required: false }];
  public belongsToAttributes = [{ name: 'content-type', required: true }, { name: 'post-status', required: true },
    { name: 'user', required: true }];
  public manyToManyAttributes = [];
}
