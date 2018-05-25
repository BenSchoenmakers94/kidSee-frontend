import { Location } from './location';
import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
    type: 'themes'
})

export class Theme extends BaseModel {

    @Attribute()
    name: string;

    @HasMany()
    locations: Location[];

    public simpleAttributeNames = [{ name: 'id', required: false }, { name: 'name', required: true }];
    public hasManyAttributes = [];
    public belongsToAttributes = [];
    public manyToManyAttributes = [{ name: 'locations', required: false }];
}
