import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Pagination({ currentPage, totalPages, onChangePage }) {
  const [buttonsToShow] = useState(5); // Número de botones a mostrar
  const [range, setRange] = useState({
    start: Math.max(currentPage - Math.floor(buttonsToShow / 2), 1),
    end: Math.min(currentPage + Math.floor(buttonsToShow / 2), totalPages),
  }); // Rango de páginas a mostrar

  const handleChangePage = (page) => {
    onChangePage(page);
    setRange({
      start: Math.max(page - Math.floor(buttonsToShow / 2), 1),
      end: Math.min(page + Math.floor(buttonsToShow / 2), totalPages),
    });
  };

  const handleClickFirstPage = () => {
    handleChangePage(1);
  };

  const handleClickLastPage = () => {
    handleChangePage(totalPages);
  };

  const handleClickPrevPage = () => {
    handleChangePage(currentPage - 1);
  };

  const handleClickNextPage = () => {
    handleChangePage(currentPage + 1);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = range.start; i <= range.end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleChangePage(i)}
          className={`flex justify-center items-center h-[32px] w-auto px-3 bg-gray-100 border border-gray-300 rounded-[3px] hover:bg-gray-400/10 hover:border-gray-400 ${
            currentPage === i
              ? "bg-[#3978bf] text-white hover:bg-[#336fb3] hover:border-gray-600"
              : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex gap-[1px] pagination">
      <button
        className="flex justify-center items-center h-[32px] w-auto px-2 bg-gray-100 border border-gray-300 rounded-[3px]  hover:bg-gray-400/10 hover:border-gray-400"
        onClick={handleClickFirstPage}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="flex justify-center items-center h-[32px] w-[32px] bg-gray-100 border border-gray-300 rounded-[3px] hover:bg-gray-400/10 hover:border-gray-400"
        onClick={handleClickPrevPage}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft />
      </button>
      {renderButtons()}

      <button
        className="flex justify-center items-center h-[32px] w-[32px] bg-gray-100 border border-gray-300 rounded-[3px] hover:bg-gray-400/10 hover:border-gray-400"
        onClick={handleClickNextPage}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight />
      </button>
      <button
        className="flex justify-center items-center h-[32px] w-auto px-2 bg-gray-100 border border-gray-300 rounded-[3px] hover:bg-gray-400/10 hover:border-gray-400"
        onClick={handleClickLastPage}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
}

export default Pagination;
