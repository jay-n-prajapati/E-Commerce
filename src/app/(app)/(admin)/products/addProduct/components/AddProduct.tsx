import ProductForm from '../../components/ProductForm';

const AddProduct = () => {
  return (
    <>
      <ProductForm
        initialValues={{
          id: '',
          category: '',
          description: '',
          imageUrls: [],
          name: '',
          price: 0,
          stockQuantity: 0,
          thumbnailUrl: '',
        }}
      />
    </>
  );
};

export default AddProduct;
