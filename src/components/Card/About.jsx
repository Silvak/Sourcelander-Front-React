import React from "react";

function About(props) {
  try {
    const { avatar, abstrac, bio } = props.aboutData;
    const lengthList = props.aboutData.length - 1;
    const bioArr = bio[0].split(". ") || [""];

    return (
      <div className="flex flex-col">
        <div className="flex items-center mb-6 pb-3 border-b-[2px] border-gray-200">
          <div className="w-[48px] h-[48px] bg-gray-200 border border-gray-300">
            <img src={avatar} alt="" />
          </div>
          <div className="flex flex-col justify-between ml-4">
            <h4 className="text-[1em] font-semibold">{abstrac[0] || ""}</h4>
            <p className="font-semibold text-[#666] italic">
              "{abstrac[1] || ""}"
            </p>
          </div>
        </div>
        <div>
          <div className="">
            <h5 className="font-semibold pb-4">Bio</h5>
            {bioArr.map((element, index) => (
              <p key={index} className="block pb-6 text-[#666]">
                {element}
              </p>
            ))}
          </div>
          {lengthList == -1 && (
            <div className="w-full col-span-3 text-center text-[#666] pt-10 pb-16">
              No content to show.
            </div>
          )}
        </div>
      </div>
    );
  } catch {
    return (
      <>
        <div className="w-full col-span-3 text-center text-[#666] pt-10 pb-16">
          No content to show.
        </div>
      </>
    );
  }
}

export default About;
