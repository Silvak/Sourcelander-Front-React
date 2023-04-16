import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

//
const ButtonBar = (props) => {
  const [open, setOpen] = useState(false);
  const { text, borderLine, active, icon } = props;

  //get a click
  const handleOpen = () => {
    if (active) {
      setOpen(false);
      props.onChange(null);
    } else {
      setOpen(true);
      props.onChange();
    }
  };

  return (
    <>
      <button
        className={`relative top-0 left-0 flex justify-between items-center min-w-[25%] h-full  px-[18px] py-3 `}
        onClick={handleOpen}
      >
        {/* Icons & title */}
        <div className="flex justify-between items-center w-full z-10 ">
          <span className="text-[1.1em]">{icon}</span>
          <p className="font-semibold text-[0.86em]">{text}</p>
          <span className="text-xl">
            <RiArrowRightSLine
              className={`transition  duration-200 ${
                active ? "-rotate-[90deg]" : "-rotate-[270deg]"
              } `}
            />
          </span>
        </div>

        {/*  Active style  */}
        {active && (
          <div className="absolute -top-[1px] -left-[1px] w-[101%] h-[52px] bg-white z-[1] border-x border-t-[3px] border-[#3773b7] ">
            {" "}
          </div>
        )}

        {/* Border */}
        <div
          className={`absolute top-3  ${
            borderLine == "r" && active == false
              ? "flex right-0 h-[24px]"
              : "invisible"
          }  w-[1px] bg-gray-300`}
        >
          {" "}
        </div>
      </button>
    </>
  );
};

export default ButtonBar;
