import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const navigate = useNavigate();
  const pageNumbers = [];
  const [number, setNumber] = useState(1);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const before = () => {
    number > 1 && setNumber(number - 1);
    navigate(`/${number}`);
  };

  const after = () => {
    number < pageNumbers.length && setNumber(number + 1);
    navigate(`/${number}`);
  };

  return (
    <nav className="flex w-full bg-gray-200 h-[52px] overflow-hidden border-b border-x border-gray-300">
      <ul className="flex justify-center items-center pagination w-full">
        <button
          className="flex justify-center items-center h-[32px] w-[32px] bg-gray-100 border border-gray-300 rounded-[3px]"
          onClick={before}
        >
          <MdKeyboardArrowLeft />
        </button>
        <li className="text-[#666] font-semibold w-[48px] text-center">
          {number}
        </li>
        <button
          className="flex justify-center items-center h-[32px] w-[32px] bg-gray-100 border border-gray-300 rounded-[3px]"
          onClick={after}
        >
          <MdKeyboardArrowRight />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;

/*
<nav className="flex w-full bg-gray-200 h-[52px] overflow-hidden">
      <ul className="flex items-center pagination max-w-[850px]">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item  "
            onClick={() => navigate(`/${number}`)}
          >
            <a
              onClick={() => paginate(number)}
              className="flex justify-center items-center h-[42px] w-[42px] bg-white border border-gray-300 cursor-pointer"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
*/
