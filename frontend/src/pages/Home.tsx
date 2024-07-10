import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { api } from "../services/api";
import { toast } from "sonner";
import { clearCart } from "../features/slices/cartSlice";
import { useDispatch } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.href.includes("reference")) {
      // Get the URLSearchParams object
      const params = new URLSearchParams(window.location.search);

      // Get the value of the 'reference' parameter
      const reference = params.get("reference");
      try {
        const verify = async () => {
          const response = await api.get(`/orders/verify/${reference}`);
          toast.success(response.data.message);
          dispatch(clearCart());
        };
        verify();
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  }, []);
  return (
    <div>
      <Header />
      <HeroSection />
      <ProductList />
    </div>
  );
};

export default Home;
