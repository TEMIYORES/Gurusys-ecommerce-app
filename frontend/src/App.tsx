import { Outlet } from "react-router-dom";
import { api } from "./services/api";
import { setProducts } from "./features/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
