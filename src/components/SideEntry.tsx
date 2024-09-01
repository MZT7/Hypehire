import { useState } from "react";
import { useRecoilState } from "recoil";
import { menuState } from "../state/state";
import { FaFolder } from "react-icons/fa";
import { SiCodeblocks } from "react-icons/si";
// import RightClick from "./RightClick";
// import { BiRename } from "react-icons/bi";
// import { menuState } from '../state/state';

type TEntry = {
  name: string;
  children?: TEntry[];
  depth?: number;
  id?: number;
};
const SideEntry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  // if (!entry.children) return <div>{entry.name}</div>;
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

  const [formData] = useRecoilState(menuState);
  console.log(entry);
  console.log(formData);
  // console.log();

  return (
    <div className="flex flex-col item-center">
      {/* <RxDividerVertical className="h-full min-h-screen" /> */}
      {/* <div className="absolute top-0 left-0 w-px h-full mr-40 transform -translate-x-1/2 bg-black"></div> */}
      <div className="w-full py-2">
        {entry?.children && entry.children.length > 0 ? (
          <div className="flex items-center gap-x-3">
            <button
              className="inline-flex items-center justify-center gap-x-3 "
              onClick={() => setIsExpanded(!isExpanded)}
              onContextMenu={() => console.log("working")}
            >
              <span>
                {isExpanded
                  ? entry.children.length > 0 && (
                      <div className="flex flex-col items-center">
                        <FaFolder color="#d0d5dd" fontSize={20} />

                        {/* <div className="w-px h-40 transform -translate-x-1/2 bg-black"></div> */}
                      </div>
                    )
                  : entry.children.length > 0 && (
                      <FaFolder color="#d0d5dd" fontSize={20} />
                    )}
              </span>
              {entry.name}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-3">
            <SiCodeblocks />
            {entry.name}
          </div>
        )}

        {isExpanded && (
          <div className={`w-full py-2`}>
            {entry.children?.map((option, index) => (
              <SideEntry
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
};

export default SideEntry;
