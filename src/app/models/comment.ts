import { Attribute, JsonApiModel, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi';
import { User } from './user';
import { Post } from './post';
import { ContentType } from './contentType';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'comments'
})

export class Comment extends BaseModel {
  @BelongsTo()
  user: User;

  @BelongsTo()
  post: Post;

  @Attribute({ serializedName: 'content' })
  subject: string;

  @BelongsTo()
  'content-type': ContentType;

  public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'subject', required: true }];
  public hasManyAttributes = [];
  public belongsToAttributes = [{ name: 'content-type', required: true }, { name: 'post', required: true },
    { name: 'user', required: true }];
  public manyToManyAttributes = [];
}
