import { Theme } from './../models/theme';
import { LocationType } from './../models/locationType';
import { PostStatus } from './../models/postStatus';
import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Post } from '../models/post';
import { ContentType } from '../models/contentType';
import { Location } from '../models/location';
import { Comment } from '../models/comment';
import { Assignment } from '../models/assignment';
import { AssignmentType } from '../models/assignmentType';
import { Answer } from '../models/answer';
import { AnswerType } from '../models/answerType';

const config: DatastoreConfig = {
  // baseUrl: 'http://174.138.7.193/api',
    baseUrl: 'http://128.199.32.227/api',
  models: {
    users: User,
    posts: Post,
    comments: Comment,
    'post-statuses': PostStatus,
    'content-types': ContentType,
    locations: Location,
    'location-types': LocationType,
    themes: Theme,
    assignments: Assignment,
    'assignment-types': AssignmentType,
    answers: Answer,
    'answer-types': AnswerType
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
