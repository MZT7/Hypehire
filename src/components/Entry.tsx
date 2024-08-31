/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  RiAddCircleFill,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useRecoilState } from "recoil";
import { menuState } from "../state/state";
import RightClick from "./RightClick";
// import { menuState } from '../state/state';

type TEntry = {
  name: string;
  children?: TEntry[];
  depth?: number;
  id?: number;
};
// type Tdata = {
//   name: string;
//   depth?: number;
//   parentData?: string;
//   MenuID?: string;
// };

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  // if (!entry.children) return <div>{entry.name}</div>;
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useRecoilState(menuState);
  console.log(entry);
  console.log(formData);
  // console.log();

  return (
    <div className="flex flex-col item-center">
      {/* <RxDividerVertical className="h-full min-h-screen" /> */}
      {/* <div className="absolute top-0 left-0 w-px h-full mr-40 transform -translate-x-1/2 bg-black"></div> */}
      <div className="w-full py-2">
        {entry?.children && entry.children.length > 0 ? (
          <div className="flex">
            <button
              className="inline-flex items-center justify-center gap-x-3 "
              onClick={() => setIsExpanded(!isExpanded)}
              onContextMenu={() => console.log("working")}
            >
              <span>
                {isExpanded
                  ? entry.children.length > 0 && (
                      <div className="flex flex-col items-center">
                        <RiArrowDownSLine />

                        {/* <div className="w-px h-40 transform -translate-x-1/2 bg-black"></div> */}
                      </div>
                    )
                  : entry.children.length > 0 && <RiArrowRightSLine />}
              </span>
            </button>
            {/* {entry.name} */}
            <RightClick
              name={entry.name}
              options={["Rename"]}
              handleClick={() =>
                setFormData({
                  ...formData,
                  depth: entry?.depth as number,
                  parentData: entry?.name,
                  MenuID: entry?.id as number,
                  isEdit: true,
                })
              }
            />
            <RiAddCircleFill
              color="#253BFF"
              className="cursor-pointer "
              size={30}
              onClick={() =>
                setFormData({
                  ...formData,
                  depth: entry?.depth as number,
                  parentData: entry?.name,
                  MenuID: entry?.id as number,
                  isEdit: false,
                })
              }
            />
          </div>
        ) : (
          <div className="flex items-center pl-4">
            {entry.name}
            <RiAddCircleFill
              className="cursor-pointer "
              color="#253BFF"
              size={30}
              onClick={() =>
                setFormData({
                  ...formData,
                  depth: entry?.depth as number,
                  parentData: entry?.name,
                  MenuID: entry?.id as number,
                })
              }
            />
          </div>
        )}

        {isExpanded && (
          <div className={`w-full py-2`} style={{ paddingLeft: `${depth}rem` }}>
            {entry.children?.map((option, index) => (
              <Entry
                entry={option}
                depth={depth + 1}
                key={option?.id || index}
              />
            ))}
          </div>
        )}
      </div>

      {/* {isExpanded && } */}
    </div>
  );
}

export default Entry;
