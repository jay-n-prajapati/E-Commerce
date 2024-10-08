export function getProductsFilters(searchParams: URLSearchParams) {
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const category = searchParams.get('category') || '';
  const tags = searchParams.get('tags') || '';
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || '';

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  // sort query
  const sortQuery = sort
    ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 }
    : {};

  // search query
  const searchQuery = {};

  // search
  if (q) searchQuery.name = { $regex: q, $options: 'i' };
  // min and max price
  if (minPrice || maxPrice) {
    searchQuery.price = {};
    if (minPrice) searchQuery.price.$gte = parseInt(minPrice);
    if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice);
  }
  // category
  if (category) searchQuery.category = category;
  // tags
  if (tags) searchQuery.tags = { $all: tags.split(',') };

  return { searchQuery, sortQuery, page, limit, skip };
}
