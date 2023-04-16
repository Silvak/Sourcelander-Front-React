import React from "react";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}

export default Index;
