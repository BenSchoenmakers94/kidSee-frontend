import { Theme } from './theme';
import { LocationType } from './locationType';
import { JsonApiModelConfig, Attribute, BelongsTo, HasMany } from 'angular2-jsonapi';
import { BaseModel } from './baseModel';

@JsonApiModelConfig({
  type: 'locations'
})

export class Location extends BaseModel {

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

  @Attribute()
  rating: number;

  @Attribute({serializedName: 'rating-count'})
  ratingCount: number;

  @Attribute({serializedName: 'website-link'})
  websiteLink: string;

  @BelongsTo()
  'location-type': LocationType;

  @HasMany()
  themes: Theme[];

  public simpleAttributeNames = [{ name: 'Id', required: true }, { name: 'Name', required: true },
    { name: 'Lon', required: true }, { name: 'Lat', required: true }, { name: 'Description', required: true },
    { name: 'Address', required: true }, { name: 'Websitelink', required: false }];
  public hasManyAttributes = [];
  public belongsToAttributes = [{ name: 'Location-type', required: true }];
  public manyToManyAttributes = [{ name: 'Themes', required: false }];
}
