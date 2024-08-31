import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../components/ui/context-menu";

interface Props {
  name: string;
  options: string[];
  handleClick: () => void;
}

const RightClick = ({ name, options, handleClick }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{name}</ContextMenuTrigger>
      <ContextMenuContent className="bg-red-200 ">
        {options.map((option, index) => (
          <ContextMenuItem className="p-4" onClick={handleClick} key={index}>
            {option}
          </ContextMenuItem>
        ))}
        {/* <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RightClick;
