import React from "react";
import { ImStatsDots } from "react-icons/im";
import { BsStar } from "react-icons/bs";

const Comments = (props) => {
  const { avatar, commnet } = props.data;
  const title = commnet[0].split("·");

  let lasItem = props.lastItem();
  return (
    <div className={`${lasItem ? "" : "border-b"} flex py-6  border-gray-300`}>
      <div className="h-[32px] w-[32px] overflow-hidden">
        <img src={avatar} alt="" className="cover w-full" />
      </div>
      <div className="flex flex-col justify-between w-full pl-4">
        <h4 className="">
          <span className="text-[1em] font-semibold text-[#3e76c8]">
            {title[0]}
          </span>
          <span className="px-1">·</span>
          <span className="text-[#666]">{title[1]}</span>
        </h4>
        <p className="text-[#333] text-[1em] pt-1">{commnet[1]}</p>
        <p className="text-[0.9em] pt-6 text-[#3e76c8]">{commnet[2]}</p>
      </div>
    </div>
  );
};

function Performance(props) {
  const { stats, feedback } = props.performanceData[0];
  const lengthList = feedback.length - 1;

  return (
    <div className="felx flex-col">
      <div>
        <h3 className="flex items-center text-[1em] font-semibold">
          <ImStatsDots /> <span className="ml-4">Stats</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 pt-4 pb-12">
          {stats.map((element, index) => (
            <div key={index}>
              <span className="text-[#666]">{element.split(":")[0]}: </span>
              <span className="font-semibold">{element.split(":")[0]}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="flex items-center text-[1em] font-semibold">
          <BsStar /> <span className="ml-4">Feedback</span>
        </h3>
        <div className="grid grid-cols-1 pt-4">
          {feedback.map((element, index) => (
            <Comments
              key={index}
              data={element}
              lastItem={() => {
                return lengthList == index ? true : false;
              }}
            />
          ))}
          {lengthList == -1 && (
            <div className="w-full text-center text-[#666] pt-10 pb-16">
              No feedback received yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Performance;
