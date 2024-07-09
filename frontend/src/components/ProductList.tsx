import React from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/slices/productsSlice";
import Center from "./Center";
import ProductBox from "./ProductBox";
import { ProductType } from "../utilities/Types";

const ProductList: React.FC = () => {
  const products = useSelector(getProducts);

  return (
    <Center>
      <h1 className="font-semibold text-2xl mt-8 mb-5">All Products</h1>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: ProductType) => (
          <ProductBox key={product._id} {...product}/>
        ))}
      </div>
    </Center>
  );
};

export default ProductList;
