import { ReactNode } from "react";

const Center = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[980px] my-0 mx-auto py-0 px-5">{children}</div>;
};

export default Center;
