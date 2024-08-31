import { atom } from "recoil";

export const menuState = atom({
  key: "menuState", // unique ID (with respect to other atoms/selectors)
  default: { name: "", depth: 0, parentData: "", MenuID: 0, isEdit: false }, // default value is an object
});
