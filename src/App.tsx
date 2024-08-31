// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideMenu from "./components/SideMenu";
import Content from "./components/Content";

function App() {
  return (
    <div className="flex w-full font-jakarta ">
      <SideMenu />
      <Content />
    </div>
  );
}

export default App;
