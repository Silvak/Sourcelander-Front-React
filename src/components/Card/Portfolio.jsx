import React from "react";

const CardPortfolio = (props) => {
  const { title, image } = props.data;
  return (
    <div>
      <div className="w-[100%] max-h-[184px] bg-gray-200 border border-gray-400 rounded-[3px] overflow-hidden ">
        <img src={image} alt="" className="w-full object-contain" />
      </div>
      <h4 className="py-4 font-semibold text-[#3e76b8] text-[1em]">{title}</h4>
    </div>
  );
};

function Portfolio(props) {
  const lengthList = props.porfolioData.length - 1;

  return (
    <div className={`${lengthList != -1 && "pb-10"} grid grid-cols-3 gap-4`}>
      {props.porfolioData.map((elemnt, index) => (
        <CardPortfolio key={index} data={elemnt} />
      ))}
      {lengthList == -1 && (
        <div className="w-full col-span-3 text-center text-[#666] pt-10 pb-16">
          There are no portfolios to display.
        </div>
      )}
    </div>
  );
}

export default Portfolio;
