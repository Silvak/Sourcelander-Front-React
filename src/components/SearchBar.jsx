import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar(props) {
  return (
    <div className=" py-12">
      <div className="flex justify-between h-[45px] w-full">
        <div className="flex justify-between rounded-[3px] h-full border border-gray-300  w-[550px] ">
          <button className="w-[30%] h-full bg-gray-100 "> Any Category</button>
          <input
            type="text"
            placeholder="Search Freelances"
            className="h-full w-[70%] py-1 px-3 outline-none"
          />
          <button className="flex justify-center items-center w-[45px] h-full bg-gray-100 ">
            <AiOutlineSearch className="text-lg" />
          </button>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button className="w-[170px] h-full border border-gray-300">
            Location
          </button>
          <button className="w-[170px] h-full border border-gray-300">
            {" "}
            Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
