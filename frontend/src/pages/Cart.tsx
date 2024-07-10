import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import CartIcon from "../assets/Icons/CartIcon";
import Center from "../components/Center";
import Header from "../components/Header";
import PriceFormat from "../components/PriceFormat";
import {
  AddToCart,
  getCartProducts,
  RemoveFromCart,
} from "../features/slices/cartSlice";
import { api } from "../services/api";
import { ProductType } from "../utilities/Types";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartProducts);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  let total = 0;
  for (const product of cartItems) {
    const price = product.price || 0;
    total += price;
  }
  let transactionFee = 0;
  transactionFee = total * 0.015 + 100 > 2000 ? 2000 : total * 0.015 + 100;

  const seen = new Set();
  const uniqueCartProducts = cartItems.filter((product) => {
    if (seen.has(product._id)) {
      return false;
    } else {
      seen.add(product._id);
      return true;
    }
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCartItems = uniqueCartProducts.map((product) => {
      const quantity = cartItems.filter((p) => p._id === product._id).length;
      return {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      };
    });
    const formData = {
      origin: window.location.origin,
      customerInfo: {
        name,
        email,
        phoneNumber,
        city,
        state,
        streetAddress,
        country,
      },
      products: [...newCartItems],
      total,
      transactionFee,
    };
    try {
      // Sending data to server
      const response = await api.post("/orders", formData);
      console.log({ response });
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const increaseProduct = (product: ProductType) => {
    dispatch(AddToCart(product));
  };
  const decreaseProduct = (product: ProductType) => {
    dispatch(RemoveFromCart(product));
  };

  return (
    <div>
      <Header />
      <Center>
        <div className="grid grid-cols-1 gap-10 items-start mt-10 md:grid-cols-3">
          <div className="bg-lightGrey rounded-lg p-3 sm:p-10 col-span-1 md:col-span-2">
            {cartItems.length > 0 && (
              <>
                <h2 className="font-semibold text-3xl mb-3">Cart</h2>
                <div className="">
                  <div className="grid grid-cols-3 text-left justify-between w-full uppercase text-darkGrey font-medium">
                    <p>Product</p>
                    <p className="text-center">Quantity</p>
                    <p>Price</p>
                  </div>
                </div>
                {uniqueCartProducts?.map((product: any) => (
                  <tr
                    key={product._id}
                    className="grid grid-cols-3 text-left items-center justify-between w-full text-darkGrey"
                  >
                    <div className="py-3 px-0 font-semibold">
                      <div className="w-[50%] p-1 mb-2 rounded-lg border border-darkGrey">
                        <img src={product.image} />
                      </div>
                      {product.name}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="w-fit text-xs rounded-sm bg-darkGrey py-1 px-2 text-white hover:bg-darkGrey"
                        onClick={() => decreaseProduct(product)}
                      >
                        -
                      </button>
                      <div className="py-0 px-2">
                        {cartItems.filter((p) => p._id === product._id).length}
                      </div>
                      <button
                        className="text-xs rounded-sm bg-darkGrey py-1 px-2 text-white hover:bg-darkGrey"
                        onClick={() => increaseProduct(product)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <PriceFormat
                        price={
                          cartItems.filter((p) => p._id === product._id)
                            .length * product.price
                        }
                      />
                    </div>
                  </tr>
                ))}
                <hr className="mb-3 border-t border-darkGrey" />
                <div className="grid grid-cols-3 uppercase text-darkGrey font-semibold text-left justify-between items-baseline text-sm">
                  <div className="col-span-2">Products</div>
                  <td>{<PriceFormat price={total} />}</td>
                </div>
                <div className="grid grid-cols-3 uppercase text-darkGrey font-semibold text-left justify-between items-baseline text-sm">
                  <div className="col-span-2">Transaction Fee</div>
                  <td>{<PriceFormat price={transactionFee} />}</td>
                </div>
                <tr className="grid grid-cols-3 uppercase text-darkGrey font-semibold text-left justify-between items-baseline text-base md:text:2xl">
                  <div className="col-span-2">Total</div>
                  <td>
                    <div className="font-medium md:text-2xl">
                      ₦
                      {(total + transactionFee || 0).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </td>
                </tr>
              </>
            )}
            {cartItems.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                Your <CartIcon /> is empty
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="w-full bg-lightGrey rounded-lg py-5 px-3 sm:p-5 col-span-1">
              {/* <Heading2>Account details</Heading2> */}
              <div className="font-semibold text-2xl">Order Information</div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  className="basic-input"
                />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="basic-input"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(e.target.value)
                  }
                  className="basic-input"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                    className="basic-input"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={state}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setstate(e.target.value)
                    }
                    className="basic-input"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  value={streetAddress}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setStreetAddress(e.target.value)
                  }
                  className="basic-input"
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  value={country}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCountry(e.target.value)
                  }
                  className="basic-input"
                />
                <div className="mt-2">
                  <button className="basic-button w-full">
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Center>
    </div>
  );
};

export default Cart;
