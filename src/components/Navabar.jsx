import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import LogOut from "./LogOut";
import { auth } from "../firebase";
import { async } from "@firebase/util";
import { CiLogin } from "react-icons/ci";

const DropButtom = () => {
  return <div></div>;
};

function Navabar() {
  const navigate = useNavigate();
  const showBtn = true;
  const [drop, setDrop] = useState(false);
  const [drop2, setDrop2] = useState(false);

  const handleDrop = () => {
    if (drop2 == false) {
      setDrop(!drop);
    } else {
      setDrop2(!drop2);
      setDrop(!drop);
    }
  };

  const handleDrop2 = () => {
    if (drop == false) {
      setDrop2(!drop2);
    } else {
      setDrop(!drop);
      setDrop2(!drop2);
    }
  };

  return (
    <header className="fixed flex items-center top-0 left-0 bg-white w-full h-[72px] border-b border-gray-300 z-[1000]">
      <div className="flex items-center justify-between  w-full pl-2 pr-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="https://sourcelander.org/"
            className="h-[36px] w-[211px] font-semibold text-[1.8em] cursor-pointer"
          >
            <img src="logo.png" className="h-full" alt="" />
          </a>
        </div>

        {/* Links */}
        <div className="flex justify-start w-[44%] ">
          {/*
          <ul className="flex items-center justify-end">
            <li className="text-[1em] text-[#333] font-semibold px-3 py-2 hover:text-[#3e76c8]">
              <a href="">Find Freelancers</a>
            </li>
            <li className="text-[1em] text-[#333] font-semibold px-3 py-2 hover:text-[#3e76c8]">
              <a href="">About</a>
            </li>
          </ul>
          */}
        </div>

        {/* Button login */}
        {auth.currentUser ? (
          <div className="flex items-center justify-end gap-4 w-[32%]">
            <div className="relative flex justify-between gap-5">
              <div
                onClick={handleDrop2}
                className="flex justify-center items-center px-1 cursor-pointer "
              >
                <AiFillBell className="text-[#666] text-[1.3em]" />
              </div>
              <div
                className="w-[32px] h-[32px] bg-gray-100 border border-gray-300 cursor-pointer"
                onClick={handleDrop}
              >
                <img
                  src={
                    "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  }
                  alt=""
                />
              </div>

              {/* DropBtn 1 */}
              {drop && (
                <div className="absolute flex gap-5 flex-col items-end top-[52px] -right-[1px] w-[180px] border border-gray-300 bg-white px-5 py-4">
                  <span className="flex flex-col  mt-1">
                    <span className="w-full text-right text-gray-400 text-[11px] ">
                      id: 850863701{" "}
                    </span>
                    {auth.currentUser.email}
                  </span>
                  <LogOut>
                    <span className="hover:text-red-500">Logout</span>
                  </LogOut>
                </div>
              )}

              {/* DropBtn 2 */}
              {drop2 && (
                <div className="absolute flex gap-5 flex-col items-end top-[52px] right-[42px] w-[220px] border border-gray-300 bg-white px-5 py-4">
                  <span className="flex flex-col  my-2  justify-center items-center text-[14px] text-gray-400 text-center w-full">
                    Notifications 0
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login/account")}
            className=" flex items-center hover:text-[#3773b7] text-[#666] px-4 py-2 font-medium whitespace-nowrap"
          >
            <span className="pr-1 whitespace-nowrap">
              <CiLogin />
            </span>
            Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Navabar;

/*

       <>
              <button
                onClick={() => navigate("/login/account")}
                className="text-white font-semibold bg-[#3e76c8] px-4 py-2 rounded-[2px]"
              >
                Post a Job
              </button>
              <button
                onClick={() => navigate("/login/account")}
                className="flex items-center text-[#333] font-semibold  px-4 py-2 rounded-sm hover:text-[#3e76c8]"
              >
                <FiLogIn className="mr-2 " />
                <span>Log In</span>
              </button>
            </>
*/
