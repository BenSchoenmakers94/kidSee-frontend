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

  @Attribute()
  content: string;

  @Attribute()
  title: string;

  @Attribute()
  type: ContentType;

  @BelongsTo()
  user: User;

  @Attribute()
  postStatuses: PostStatus;

  @HasMany()
  comments: Comment[] = [];

  @Attribute()
  created_at: Date;

  @Attribute()
  updated_at: Date;
}
