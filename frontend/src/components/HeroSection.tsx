import Center from "./Center.tsx";
import CartIcon from "../assets/Icons/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getProducts } from "../features/slices/productsSlice";
import { AddToCart } from "../features/slices/cartSlice.tsx";

const HeroSection = () => {
  const product = useSelector(getProducts)[0];

  const dispatch = useDispatch();

  const handleAddtoCart = (id: string | null, name: string | null) => {
    dispatch(AddToCart(id));
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="relative bg-darkGrey text-white py-12 px-0">
      <Center>
        <div className="grid grid-cols-1 gap-10 items-center md:grid-cols-2">
          <div>
            <div className="m-0 font-semibold text-3xl mb-2 md:text-4xl">
              {product?.name}
            </div>
            <div className="text-lightGrey text-sm mb-5">
              {product?.description}
            </div>
            <div className="flex gap-3">
              <button className="basic-button">Read more</button>
              <button
                className="basic-button"
                onClick={() => handleAddtoCart(product._id, product.name)}
              >
                <CartIcon />
                Add to cart
              </button>
            </div>
          </div>
          <div className="relative flex justify-center max-h-[430px] text-center">
            <img
              src={product?.image}
              alt={"product Image"}
              className="max-w-[70%] md:max-w-[100%]"
            />
          </div>
        </div>
      </Center>
    </div>
  );
};

export default HeroSection;
