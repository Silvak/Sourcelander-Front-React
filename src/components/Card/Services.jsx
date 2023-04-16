import { v4 as uuid } from "uuid";

const CardServices = (props) => {
  const { title, description, image, skills } = props.data;

  return (
    <div className="flex flex-col justify-between min-h-[174px] w-full  border-b border-gray-300 py-6 ">
      {/* Abstract article */}
      <div className="flex justify-between h-[174px] gap-4">
        <div className="w-[32%] h-min overflow-hidden bg-gray-200 border border-gray-400 rounded-[3px]">
          <img src={image} alt="" className="w-full object-containt" />
        </div>
        <div className="flex flex-col justify-between w-[72%]">
          <h3 className="">
            <a href={"/"} className="text-[#333] text-[1em] font-bold">
              {title}
            </a>
            <span className="text-[0.9em] text-[#666] ml-4 font-semibold">
              {description[0]}
            </span>
          </h3>
          <p className="text-[0.9em] text-[#333] pt-1 pb-3">{description[1]}</p>

          <ul className="flex flex-wrap w-full">
            {skills.map((element, index) => (
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
    </div>
  );
};

/*


*/

function Services(props) {
  const lengthList = props.servicesData.length - 1;
  return (
    <div className="w-[100%] ">
      {props.servicesData.map((element, index) => (
        <CardServices key={index} data={element} />
      ))}
      {lengthList == -1 && (
        <div className="w-full col-span-3 text-center text-[#666] pt-10 pb-16">
          There are no services to display.
        </div>
      )}
    </div>
  );
}

export default Services;
