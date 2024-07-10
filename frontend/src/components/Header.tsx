import { Link } from "react-router-dom";
import Center from "./Center.tsx";
import { useSelector } from "react-redux";
import BarsIcon from "../assets/Icons/BarsIcon";
import { useState } from "react";
import CloseIcon from "../assets/Icons/CloseIcon";
import { getCartLength } from "../features/slices/cartSlice.tsx";
import classNames from "classnames";

const Header = () => {
  const cartLength: number = useSelector(getCartLength);
  const [sidebarnavactive, setsidebarnavactive] = useState(false);
  return (
    <div className="sticky bg-darkGrey top-0 z-10 text-lightGrey">
      <Center>
        <div className="flex justify-between items-center py-5 px-0">
          <Link className="text-white outline-none text-xl" to={"/"}>
            Gurumart
          </Link>
          <div
            className={classNames(
              `block fixed gap-4 top-0 bottom-0 right-0 p-5 z-10 ease-linear duration-300 bg-darkGrey md:flex md:static md:p-0 md:items-center ${
                sidebarnavactive ? "left-0" : "left-full"
              }`
            )}
          >
            <div className="flex justify-between md:hidden">
              <Link className="text-white outline-none text-xl" to={"/"}>
                Gurumart
              </Link>
              <div
                className="bg-transparent w-6 text-white cursor-pointer md:hidden"
                onClick={() => setsidebarnavactive(!sidebarnavactive)}
              >
                <CloseIcon />
              </div>
            </div>
            <div className={`flex flex-col gap-5 items-start md:flex-row`}>
              <Link
                to={"/"}
                className={`md:p-0 hover:text-orange ${
                  window.location.href.endsWith("/") && "text-orange"
                }`}
              >
                Home
              </Link>
              <Link to={"/cart"} className="md:p-0 hover:text-orange">
                Cart ({cartLength})
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="block md:hidden"
              onClick={() => setsidebarnavactive(!sidebarnavactive)}
            >
              <BarsIcon />
            </div>
            <Link to={"/dashboard"}>
              <button className="basic-button">Dashboard</button>
            </Link>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Header;
