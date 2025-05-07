import ProductDetails from '../components/ProductDetails';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams(); // Get the product ID from the URL

  return (
    <div className="py-8">
      <ProductDetails productId={id} />
    </div>
  );
}

export default ProductDetailsPage;