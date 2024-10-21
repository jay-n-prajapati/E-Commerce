import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
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
    category: () => faker.commerce.department(),
    tags: () => [
      faker.commerce.productAdjective(),
      faker.commerce.productMaterial(),
    ],
    stockQuantity: () => faker.number.int({ min: 1, max: 100 }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },
});
