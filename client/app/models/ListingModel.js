import Immutable from 'immutable';
import { Image, ResponsiveImage } from './ImageModel';
import { Profile } from './ProfileModel';

const ListingModel = Immutable.Record({
  id: 'uuid',
  title: 'Listing',
  images: new Immutable.List([new ResponsiveImage({
    '1x': new Image(),
    '2x': new Image(),
  })]),
  authorId: 'foo',
  author: new Profile(),

  // these need to be updated
  price: 1,
  priceUnit: '$',
  per: '/ day',
  distance: 1,
  distanceUnit: 'km',
  listingURL: 'https://example.com/listing/1',
});

const parseListingImages = (images) => new ResponsiveImage({
  '1x': images.square,
  '2x': images.square2x,
});

export const parse = (l) => new ListingModel({
  id: l.get(':id'),
  title: l.getIn([':attributes', ':title']),
  images: l.getIn([':attributes', ':images']).map(parseListingImages),
  authorId: l.getIn([':relationships', ':author', ':id']),
});

export default ListingModel;
