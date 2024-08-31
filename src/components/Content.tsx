import React, { useState } from "react";
import ParentMenu from "./ParentMenu";
import { FaFolder } from "react-icons/fa";
import { TbSlash } from "react-icons/tb";
import MenuIcon from "../../public/Images/svg/MenuIcon";
// import CreatableSelect from "react-select/creatable";
import { useReactQuery } from "../utils/hooks/useReactQueryFn";
import AddParentNode from "./AddParentNode";

// type Props = {}

const Content = () => {
  const [modal, setModal] = useState(false);

  const { data: parentData } = useReactQuery(
    "getParentMenus",
    "/parent_menus",
    "get"
  );

  const parentOptions = parentData?.data?.map((item: any) => {
    return { label: item?.name, value: item?.id };
  });

  const handleSelect = (e) => {
    console.log(e.target.value);
    const { value } = e.target;

    if (value === "addKey") {
      console.log(value);
      setModal(true);
      return;
    }
  };

  const handleSubmit = () => {};

  console.log(parentData);
  return (
    <div className="flex-1 relative px-7 bg-[#FFFFFF] py-10 flex flex-col gap-y-14 min-h-screen">
      <div className="flex items-center gap-x-1 ">
        <FaFolder color="#d0d5dd" fontSize={20} />
        <TbSlash />
        <h3 className="text-sm ">Menus</h3>
      </div>
      <div className="flex items-center gap-x-3">
        <MenuIcon />
        <h1 className="text-3xl font-extrabold ">Menus</h1>
      </div>
      <div className="flex flex-col gap-y-5">
        <h1>Menu</h1>
        <select
          className="w-1/3 bg-[#F9FAFB] z-10 appearance-none rounded-md p-4"
          onChange={handleSelect}
          name="parent"
        >
          {parentOptions?.map((option: any) => (
            <option value={option?.value} key={option?.value}>
              {option?.label}
            </option>
          ))}
          <option value={"addKey"}>Add New Menu</option>
        </select>
      </div>
      <ParentMenu />
      {modal && (
        <AddParentNode setModal={setModal} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Content;
