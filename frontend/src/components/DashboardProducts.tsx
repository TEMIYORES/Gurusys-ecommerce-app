import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { ProductType } from "../utilities/Types";
import EditIcon from "../assets/Icons/EditIcon";
import DeleteIcon from "../assets/Icons/DeleteIcon";
import { toast } from "sonner";

interface PropType {
  setCurrentTab: (str: string) => void;
  setProduct: (str: ProductType) => void;
}
const DashboardProducts: React.FC<PropType> = ({
  setCurrentTab,
  setProduct,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleProductDelete = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`).then((response) => {
        toast.success(response.data.message);
        api.get("/products").then((res) => {
          setProducts(res.data);
        });
      });
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="flex-grow">
      <div className="w-full bg-lightOrange rounded-md">
        <div className="w-full p-2">
          <div className="w-full grid grid-cols-9 gap-2 items-center text-xs font-bold text-headercolor">
            <div className="">
              <p>S/N</p>
            </div>
            <p>Image</p>
            <p>Id</p>
            <p>Name</p>
            <p className="col-span-2">Description</p>
            <p>Price</p>
            <p>Stock</p>
            <p></p>
          </div>
        </div>
      </div>
      {products.length < 1 ? (
        <div className="text-left text-sm font-semibold">
          No products found.
        </div>
      ) : null}
      {products.length
        ? products.map((product: ProductType, index) => {
            return (
              <div key={product._id} className="w-full rounded-md">
                <div className="w-full p-2">
                  <div className="w-full grid grid-cols-9 gap-2 items-center text-xs font-bold text-headercolor">
                    <div className="flex gap-2 text-sm font-normal">
                      <p>{index + 1}.</p>
                    </div>
                    <img
                      src={product.image}
                      className="w-12"
                      alt="product image"
                    />
                    <p>{product._id.substring(0, 6) + "..."}</p>
                    <p>{product.name}</p>
                    <p className="col-span-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p>{product.price}</p>
                    <p>{product.stock}</p>
                    <div className="flex items-center justify-end gap-5">
                      <button
                        onClick={() => {
                          setProduct(product);
                          setCurrentTab("products/edit");
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button onClick={() => handleProductDelete(product._id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <div className="flex justify-end">
        <button
          className="basic-button"
          onClick={() => setCurrentTab("products/add")}
        >
          Add product
        </button>
      </div>
    </div>
  );
};

export default DashboardProducts;
