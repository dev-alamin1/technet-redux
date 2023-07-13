import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetSingleProductQuery } from '@/redux/api/apiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { addtoCart } from '@/redux/features/cart/cartSlice';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  /*
    {
        path: '/product-details/:id',
        element: <ProductDetails />,
      }, --- ai route theke id ti use params diye dhora hoyeche
  */

  const {data} = useGetSingleProductQuery(id);

  const dispatch = useAppDispatch();


  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.name}</h1>
          <p className="text-xl">Rating: {data?.rating}</p>
          <ul className="space-y-1 text-lg">
            {data?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => dispatch(addtoCart(data))}>Add to cart</Button>
        </div>
      </div>
      <ProductReview productId={id} />
    </>
  );
}
