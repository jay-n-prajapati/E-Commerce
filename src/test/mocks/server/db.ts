import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
  category: {
    id: primaryKey(() => faker.string.uuid()),
    name: () => faker.commerce.department(),
    slug: () => faker.lorem.slug(),
  },

  tag: {
    id: primaryKey(() => faker.string.uuid()),
    name: () =>
      faker.helpers.arrayElement([
        'New Arrival',
        'Lowest Price',
        'Winter Wear',
        'Top Seller',
        'Apple',
        'M3 chip',
      ]),
    description: () => faker.lorem.sentence(),
  },

  product: {
    id: primaryKey(() => faker.string.uuid()),
    name: () => faker.commerce.productName(),
    brand: () => faker.company.name(),
    description: () => faker.commerce.productDescription(),
    price: () => faker.commerce.price({ min: 10, max: 10000, dec: 2 }),
    imageUrls: () => [
      faker.image.url(),
      faker.image.url(),
      faker.image.url(),
      faker.image.url(),
    ],
    thumbnailUrl: () => faker.image.url(),
    category: oneOf('category'), // One category per product
    tags: manyOf('tag'),
    stockQuantity: () => faker.number.int({ min: 1, max: 100 }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  user: {
    id: primaryKey(() => faker.string.uuid()),
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    imgUrl: () => faker.image.avatar(),
    role: () => faker.helpers.arrayElement(['customer', 'admin', 'seller']),
    phoneNumber: () => faker.phone.number(),
    address: {
      street: () => faker.location.street(),
      city: () => faker.location.city(),
      state: () => faker.location.state(),
      country: () => faker.location.country(),
      zipCode: () => faker.location.zipCode(),
    },
    wishlist: manyOf('product'),
    cart: manyOf('product'),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },
});
