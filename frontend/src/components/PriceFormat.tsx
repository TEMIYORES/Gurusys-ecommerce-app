import React from "react";
interface PropType {
  price: number;
}

const PriceFormat: React.FC<PropType> = ({ price }) => {
  return (
    <div className="font-medium md:text-lg">
      ₦
      {price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </div>
  );
};

export default PriceFormat;
