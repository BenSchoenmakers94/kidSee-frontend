import { PostStatus } from './../models/postStatus';
import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Post } from '../models/post';
import { ContentType } from '../models/contentType';

const config: DatastoreConfig = {
  baseUrl: 'http://174.138.7.193/api',
  models: {
    users: User,
    posts: Post,
    comments: Comment,
    postStatuses: PostStatus,
    contentTypes: ContentType
  }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

    constructor(http: HttpClient) {
        super(http);
    }

    public getBaseUrl() {
        return this.datastoreConfig.baseUrl;
    }
}
