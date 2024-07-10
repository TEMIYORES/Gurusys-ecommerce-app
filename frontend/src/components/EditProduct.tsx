import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { ProductType } from "../utilities/Types";

interface PropType {
  setCurrentTab: (str: string) => void;
  product: ProductType | undefined;
}
const EditProduct: React.FC<PropType> = ({ product, setCurrentTab }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setStock(product.stock.toString());
    }
  }, [product]);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      if (product?._id) formData.append("id", product?._id);
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", parseFloat(price).toString());
      formData.append("stock", parseFloat(stock).toString());
      if (imageFile) formData.append("file", imageFile);

      const response = await api.put("/products", formData);
      toast.success(response.data.message);
      setCurrentTab("products");
      setSubmitting(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full">
      <div>
        <label className="text-sm text-desccolor font-bold">Product Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="basic-input"
        />
      </div>
      <div>
        <label className="text-sm text-desccolor font-bold">
          Product Description
        </label>
        <textarea
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="basic-input"
        />
      </div>
      <div>
        <label className="text-sm text-desccolor font-bold text-nowrap">
          Product Image
        </label>
        <input
          type="file"
          required
          accept="image/*"
          onChange={handleImageChange}
          className="basic-input"
        />
      </div>
      <div>
        <label className="text-sm text-desccolor font-bold">
          Product Price
        </label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="basic-input"
        />
      </div>
      <div>
        <label className="text-sm text-desccolor font-bold">
          Product Stock
        </label>
        <input
          type="number"
          required
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
          className="basic-input"
        />
      </div>
      <button
        type="submit"
        className={`basic-button w-full ${
          isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primaryOrangeHex hover:bg-secondaryOrangeHex hover:shadow-xl transition duration-300"
        }`}
      >
        {isSubmitting ? "Saving..." : "Save edit"}
      </button>
    </form>
  );
};

export default EditProduct;
