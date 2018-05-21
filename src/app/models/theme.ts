import { Location } from './location';
import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'themes'
})

export class Theme extends JsonApiModel {

    @Attribute()
    name: string;

    @HasMany()
    locations: Location[];
}
