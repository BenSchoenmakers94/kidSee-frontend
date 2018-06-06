import { Theme } from './theme';
import { LocationType } from './locationType';
import { JsonApiModelConfig, JsonApiModel, Attribute, BelongsTo, HasMany } from 'angular2-jsonapi';
import * as _ from 'lodash';
import { BaseModel } from './baseModel';
import { RequiredDecorator } from './decorators/requiredDecorator';
import { User } from './user';

@JsonApiModelConfig({
  type: 'ratings'
})

export class Rating extends BaseModel {

    public simpleAttributeNames: RequiredDecorator[];
    public hasManyAttributes: RequiredDecorator[];
    public belongsToAttributes: RequiredDecorator[];
    public manyToManyAttributes: RequiredDecorator[];

    @Attribute()
    id: string;

    @Attribute()
    rating: number;

    @Attribute({serializedName: 'object-type'})
    objectType: number;

    @Attribute({serializedName: 'object-id'})
    objectId: number;

    @Attribute()
    description: string;

    @BelongsTo()
    user: User;
}
