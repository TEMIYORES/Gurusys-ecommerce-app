import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ProductType } from "../utilities/Types";
import CartIcon from "../assets/Icons/CartIcon";
import { AddToCart } from "../features/slices/cartSlice";

const ProductBox = ({
  _id,
  name,
  image,
  price,
  stock,
  description,
}: ProductType) => {
  const dispatch = useDispatch();

  const handleAddtoCart = (product: ProductType) => {
    dispatch(AddToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="relative bg-lightGrey p-3 rounded-md">
      <img
        className="w-[100%] h-[230px] object-contain"
        src={image}
        alt="product Image"
      />
      <div className="font-semibold text-sm py-2 sm:text-base">{name}</div>
      <div className="flex flex-col justify-between gap-2">
        <div className="font-medium md:text-lg">
          ₦
          {price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <button
          className="basic-button"
          onClick={() =>
            handleAddtoCart({ _id, name, image, price, stock, description })
          }
        >
          <CartIcon /> Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductBox;
