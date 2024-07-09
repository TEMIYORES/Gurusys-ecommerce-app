import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ProductType } from "../utilities/Types";
import CartIcon from "../assets/Icons/CartIcon";
import { AddToCart } from "../features/slices/cartSlice";

const ProductBox = ({ _id, name, image, price }: ProductType) => {
  const dispatch = useDispatch();

  const handleAddtoCart = ({ _id, name }: { _id: string; name: string }) => {
    dispatch(AddToCart(_id));
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="relative bg-[#eaecef] p-3 rounded-md">
      <Link className="flex justify-center" to={`/products/${_id}`}>
        <img src={image} alt="product Image" />
      </Link>
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
          onClick={() => handleAddtoCart({ _id, name })}
        >
          <CartIcon /> Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductBox;
