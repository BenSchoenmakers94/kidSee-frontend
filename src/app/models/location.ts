import { Theme } from './theme';
import { LocationType } from './locationType';
import { JsonApiModelConfig, JsonApiModel, Attribute, BelongsTo, HasMany } from 'angular2-jsonapi';
import * as _ from 'lodash';

@JsonApiModelConfig({
  type: 'locations'
})

export class Location extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  lon: number;

  @Attribute()
  lat: number;

  @Attribute()
  description: string;

  @Attribute()
  address: string;

  @BelongsTo()
  'location-type': LocationType;

  @HasMany()
  'themes': Theme[];
}
