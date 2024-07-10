import React, { useRef, useState } from "react";
import DashboardProducts from "../components/DashboardProducts";
import DashboardOrders from "../components/DashboardOrders";
import Center from "../components/Center";
import AddNewProduct from "../components/AddNewProduct";
import EditProduct from "../components/EditProduct";
import { ProductType } from "../utilities/Types";

const Dashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("products");
  const [product, setProduct] = useState<ProductType>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdownToggle = () => {
    dropdownRef?.current?.classList.toggle("hidden");
  };
  return (
    <Center>
      <h1 className="text-center text-xl md:text-3xl mt-5 font-semibold">
        Admin Dashboard
      </h1>
      <div className="flex-grow flex flex-col md:flex-row w-full h-full bg-headerbg mt-3 p-2 md:p-5 lg:p-10 rounded-lg items-stretch bg-lightGrey">
        <div className="flex-grow flex-1 flex-col text-darkGrey gap-y-3 font-semibold border-r border-darkGrey p-3 text-sm hidden md:flex">
          <div
            className={`cursor-pointer py-1 px-4 rounded-md transition-all ease-linear hover:text-textcolor ${
              currentTab.includes("products")
                ? "bg-textcolor text-white bg-darkGrey pointer-events-none"
                : ""
            }`}
            onClick={() => setCurrentTab("products")}
          >
            products
          </div>
          <div
            className={` cursor-pointer py-1 px-4 rounded-md transition-all ease-linear hover:text-textcolor ${
              currentTab.includes("orders")
                ? "bg-textcolor text-white bg-darkGrey pointer-events-none"
                : ""
            }`}
            onClick={() => setCurrentTab("orders")}
          >
            orders
          </div>
        </div>
        <div
          className={`relative w-fit self-end text-textcolor duration-300 transition-all p-2 rounded-full ease-in-out hover:bg-bg md:hidden`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div
            ref={dropdownRef}
            className={`hidden absolute z-10 p-2 min-w-40 bg-darkGrey text-white rounded-md right-0 top-10 transition-all ease-linear origin-bottom md:hidden`}
          >
            <div className="overflow-y-auto">
              <div
                className={`flex items-center justify-between gap-1 text-sm p-2 bg-headerbg rounded-md mb-1 ${
                  currentTab.includes("products")
                    ? "bg-white text-darkGrey pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={() => setCurrentTab("products")}
              >
                Products
              </div>
              <div
                className={`flex items-center justify-between gap-1 text-sm p-2 bg-headerbg rounded-md mb-1  ${
                  currentTab == "orders"
                    ? "bg-white text-darkGrey pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={() => setCurrentTab("orders")}
              >
                Orders
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-grow flex items-stretch w-full py-3 md:px-5">
          {currentTab === "products" ? (
            <DashboardProducts
              setProduct={setProduct}
              setCurrentTab={setCurrentTab}
            />
          ) : null}
          {currentTab === "products/add" ? (
            <AddNewProduct setCurrentTab={setCurrentTab} />
          ) : null}
          {currentTab === "products/edit" ? (
            <EditProduct product={product} setCurrentTab={setCurrentTab} />
          ) : null}
          {currentTab === "orders" ? <DashboardOrders /> : null}
        </div>
      </div>
    </Center>
  );
};

export default Dashboard;
