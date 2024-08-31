/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ParentMenu from "./ParentMenu";
import { FaFolder } from "react-icons/fa";
import { TbSlash } from "react-icons/tb";
import MenuIcon from "../../public/Images/svg/MenuIcon";
// import CreatableSelect from "react-select/creatable";
import {
  useReactMutation,
  useReactQuery,
} from "../utils/hooks/useReactQueryFn";
import AddParentNode from "./AddParentNode";
import { useRecoilState, useResetRecoilState } from "recoil";
import { menuState } from "../state/state";

// type Props = {}

const Content = () => {
  const [modal, setModal] = useState(false);
  const [formData] = useRecoilState(menuState);
  const resetMenu = useResetRecoilState(menuState);

  const { data: parentData, refetch } = useReactQuery(
    "getParentMenus",
    "/parent_menus",
    "get"
  );

  const { mutate } = useReactMutation("postMenu", "/menus/create_main", "post");

  const parentOptions = parentData?.data?.map((item: any) => {
    return { label: item?.name, value: item?.id };
  });

  const handleSelect = (e: any) => {
    console.log(e.target.value);
    const { value } = e.target;

    if (value === "addKey") {
      console.log(value);
      setModal(!modal);
      return;
    }
  };

  const handleSubmit = async () => {
    mutate(
      { ...formData },
      {
        onSuccess: (data: any) => {
          // I will fire second!
          resetMenu();
          console.log("data", data);
          refetch();
          //  router.push("/auth/login");
          //  toast({
          //    description: "Registration Successful.",
          //  });
        },
      }
    );
  };

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
          // onSelect={handleSelect}
          name="parent"
          defaultValue={"Select"}
        >
          <option value={""} hidden defaultValue={"Select"}>
            Select
          </option>
          {parentOptions?.map((option: any) => (
            <option value={option?.value} key={option?.value}>
              {option?.label}
            </option>
          ))}
          <option className="text-green-500 " value={"addKey"}>
            Add New Menu
          </option>
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
