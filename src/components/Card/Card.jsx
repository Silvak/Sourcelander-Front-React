import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

//icons
import { FiHeart } from "react-icons/fi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
//components
import NavCard from "./NavCard";
import FormData from "../FormData";

//

//
const Card = (props) => {
  const { user } = props.data;

  let skills = [
    "Programming & Development",
    "App Development",
    "Architects",
    "Capacity Planning",
    "Consultant",
    "Creative",
  ];

  let freelance = [
    user.avatar,
    user.name,
    user.description.title,
    user.metadata[0],
    user.description.description[0],
  ];

  return (
    <div className="bg-white w-full min-h-[390px]  border-b border-x border-gray-300 py-6">
      <div className="flex h-[100%] px-2  md:px-5">
        {/* checkbox */}
        <div className="hidden md:flex w-[36px]">
          <input type="checkbox" name="" id="" className="h-[18px] w-[18px]" />
        </div>
        <div className="w-full">
          {/* Avatar */}
          <div className="flex justify-between w-full min-h-[74px]">
            <div className="flex">
              <div
                name="avatar-image"
                className="flex flex-col items-start w-[74px] min-w-[74px] max-w-[74px]  "
              >
                <div
                  name="avatar-image"
                  className=" w-[74px] min-w-[74px] max-w-[74px]  bg-gray-200 border border-gray-300"
                >
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-full object-contain"
                  />
                </div>
                <span className="flex sm:hidden text-[0.65em] h-[18px] mt-1 text-sm text-gray-700 font-medium bg-gradient-to-r from-gray-400/70 to-gray-200/60  px-3 rounded-r-[4px]">
                  MEMBER
                </span>
              </div>

              <div className="flex flex-col sm:justify-between ml-2 md:ml-3">
                <h2 className="flex items-center text-lg font-semibold text-[#3E76B8]">
                  {user.name || ""}
                  <span className="hidden sm:flex text-[0.7em] h-[20px] text-sm text-gray-700 font-medium ml-2 bg-gradient-to-r from-gray-400/70 to-gray-200/60  px-3 rounded-r-[4px]">
                    MEMBER
                  </span>
                </h2>
                <span className="flex text-[#333] font-medium text-[14px] md:text-[0.9em] pr-3 sm:pr-0">
                  {user.metadata[0] || ""}
                </span>
                <p className="flex items-center font-medium text-[0.9em]">
                  <RiMoneyDollarCircleFill className="mr-1" />
                  <span className="text-[#333]">{user.metadata[5] || ""} </span>
                  <span className="text-[#666] font-normal">
                    {user.metadata[6] || ""}
                  </span>
                  <span className="px-3">·</span>
                  <AiFillLike className="mr-1" />
                  <span>{user.metadata[8] || ""}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center sm:items-start">
              <div className="flex items-center">
                <button className="hidden md:flex mr-5 ">
                  <FormData>
                    <FiHeart className="text-2xl text-gray-500 font-bold" />
                  </FormData>
                </button>
                {/* <<<<<<<<<<<< Go to Login >>>>>>>>>>>>> */}
                <FormData freelance={freelance}>
                  <button className="w-[90px] sm:w-auto px-2 py-2  bg-[#3773b7] text-white sm:px-4 sm:py-3 font-medium text-[14px] sm:text-[1em]">
                    Get a Quote
                  </button>
                </FormData>
              </div>
            </div>
          </div>

          {/* Container */}
          <div className="flex flex-col w-auto min-h-[255px] border-t border-gray-300 mt-3 pt-3">
            {/* Abstract article */}
            <div className="flex justify-between min-h-[174px]">
              <div className="hidden sm:flex w-[32%] h-min max-h-[152px] max-w-[256px] bg-gray-200 border border-gray-400 rounded-[3px]">
                <img
                  src={user.description.mainImg}
                  alt=""
                  className="w-full object-containt"
                />
              </div>
              <div className="flex flex-col justify-between w-full sm:pl-5 max-w-[664px]">
                <h3 className="">
                  <a href={"/"} className="text-[#333] text-[1em] font-bold">
                    {user.description.title || ""}
                  </a>
                  <span className="text-[0.9em] text-[#666] ml-4 font-semibold">
                    {user.description.description[0].replaceAll("$", "KNRT ") ||
                      ""}
                  </span>
                </h3>
                <p className="text-[0.9em] text-[#333] pt-1 pb-3 pr-0 sm:pr-2">
                  {user.description.description[1] || ""}
                </p>

                <ul className="flex flex-wrap w-full">
                  {user.description.skills.map((element, index) => (
                    <li
                      key={uuid()}
                      className={` ${
                        index == 0 || index == 1
                          ? "bg-[#F8F8F8] text-[#333]"
                          : "bg-[#ffffff] text-[#666]"
                      } border border-gray-200 rounded-sm px-2 py-1 text-[0.8em] mr-2 mb-2`}
                    >
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* buttons navbar */}
            <div className="hidden md:flex w-full justify-center items-baseline">
              <NavCard data={props.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
