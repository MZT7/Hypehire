/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import LogoIcon from "../../public/Images/svg/LogoIcon";
import { MdOutlineMenuOpen } from "react-icons/md";
import SideEntry from "./SideEntry";
import { useReactQuery } from "../utils/hooks/useReactQueryFn";
// interface Props {

// }

const SideMenu = () => {
  const { data } = useReactQuery("getSideMenus", "/side_menu", "get");
  return (
    // <div className="relative border border-red-600 ">
    <div className="sticky top-0 bottom-0 w-72 pl-1 max-w-[calc(100%-3rem)] py-5">
      <div className=" bg-[#101828] h-full rounded-3xl text-white p-7 flex flex-col gap-y-5">
        <div className="flex items-center justify-between">
          <LogoIcon />
          <MdOutlineMenuOpen size={30} />
        </div>
        <div>
          {data?.data?.map((entry: any, index: number) => (
            <SideEntry entry={entry} depth={1} key={entry?.id || index} />
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};
export default SideMenu;
