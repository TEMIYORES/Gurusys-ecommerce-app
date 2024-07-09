import React from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/slices/productsSlice";
import Center from "./Center";

const ProductList: React.FC = () => {
  const products = useSelector(getProducts);

  return (
    <Center>
      <h1 className="font-semibold text-2xl mt-8 mb-5">All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </Center>
  );
};

export default ProductList;
