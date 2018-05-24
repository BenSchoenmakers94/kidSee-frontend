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
}
