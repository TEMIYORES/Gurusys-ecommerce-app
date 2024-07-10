export interface ProductType {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}
export interface OrderType {
  reference: string;
  products: [
    {
      _id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }
  ];
  totalAmount: number;
  customerInfo: Object;
  status: string;
}
