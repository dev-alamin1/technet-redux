import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAppSelector, useAppDispatch} from '@/redux/hooks';
import { toggle, priceRangeSlide } from '@/redux/features/product/productSlice';
import { IProduct } from '@/types/globalTypes';
import { useGetProductQuery } from '../redux/features/product/productApi';


export default function Products() {
  // const [data, setData] = useState<IProduct[]>([]);
  
  // useEffect(() => {
  //   fetch('./data.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const {data} = useGetProductQuery(undefined); //!data fetch by rtk query


  const { toast } = useToast();

  const {priceRange,status} = useAppSelector(state=>state.product);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    // console.log(value[0]);
    dispatch(priceRangeSlide(value[0]))
    //! value array hisebe return kore , but sekhane akti matro element thake
    //! ai karone value[0] deya hoyece, er karone exactly value ti pabe productSlice a
  };

  let productsData;

  if (status) {
    productsData = data?.data.filter(
      (item:{status:boolean,price:number}) => item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data.filter((item:{status:boolean,price:number}) => item.price < priceRange && item.status ===false);
    console.log("else if",productsData)
  } else {
    productsData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch onClick={() => dispatch(toggle())} id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product:IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
