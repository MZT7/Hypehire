/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import Entry from "./Entry";

import {
  useReactMutation,
  useReactQuery,
} from "../utils/hooks/useReactQueryFn";
import { useRecoilState, useResetRecoilState } from "recoil";
import { menuState } from "../state/state";

//

const ParentMenu = () => {
  const [formData, setFormData] = useRecoilState(menuState);
  const resetMenu = useResetRecoilState(menuState);
  const { data, refetch } = useReactQuery("getMenus", "/menus", "get");
  // const { data: parentData } = useReactQuery(
  //   "getParentMenus",
  //   "/parent_menus",
  //   "get"
  // );
  const { mutate: createSub } = useReactMutation(
    "postMenu",
    "/menus/create_sub",
    "post"
  );
  const { mutate: editNode } = useReactMutation(
    "editMenu",
    `/menus/${formData.MenuID}`,
    "put"
  );
  console.log(formData);

  // console.log(parentData?.data);

  // const parentOptions = parentData?.data?.map((item: any) => {
  //   return { label: item?.name, value: item?.id };
  // });

  // console.log(parentOptions);

  const handleSubmit = async () => {
    if (formData?.isEdit) {
      editNode(
        { ...formData, id: formData.MenuID },
        {
          onSuccess: (data: any, variables: any, context: any) => {
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
      return;
    }
    createSub(
      { ...formData, parent_id: formData.MenuID },
      {
        onSuccess: (data: any, variables: any, context: any) => {
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

  return (
    <div className="flex flex-col items-start justify-start w-full lg:flex-row">
      <div className="flex flex-col w-1/2 gap-y-7 ">
        <div className="flex items-center gap-x-7">
          <button className="bg-[#1D2939] px-7 py-2 rounded-full text-white">
            Expand All
          </button>
          <button className="border border-[#d0d5dd] px-7 py-2 rounded-full text-black">
            Collapse All
          </button>
        </div>
        <div>
          {data?.data?.map((entry: any, index: any) => (
            <Entry entry={entry} depth={1} key={entry?.id || index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/2 gap-y-7">
        {formData.isEdit || (
          <div>
            <div className="w-1/2 space-y-2 ">
              <label className="block">Menu ID</label>
              <input
                disabled
                type="text"
                value={formData?.MenuID ?? 0}
                onChange={(e) => console.log(e)}
                className="w-full p-3 bg-[#F9FAFB] rounded-md"
              />
            </div>
            <div className="w-1/2 space-y-2 ">
              <label className="block">Depth</label>
              <input
                disabled
                type="number"
                value={formData?.depth ?? 0}
                className="w-full p-3 bg-[#cbcecf] rounded-md"
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
        )}

        <div className="w-1/2 space-y-2 ">
          <label className="block">Parent Data</label>
          <input
            type="text"
            disabled
            value={formData?.parentData}
            className="w-full p-3 bg-[#F9FAFB] rounded-md"
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2 space-y-2 ">
          <label className="block">Name</label>
          <input
            type="text"
            value={formData?.name}
            className="w-full p-3 bg-[#F9FAFB] rounded-md"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <button
          className="bg-[#253BFF] px-7 py-5 rounded-full w-1/2 text-white"
          onClick={handleSubmit}
        >
          {formData?.isEdit ? "Edit Node" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ParentMenu;
