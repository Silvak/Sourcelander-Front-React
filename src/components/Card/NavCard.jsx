import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
//icons
import { HiLink } from "react-icons/hi";
import { ImImage } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
//components
import ButtonBar from "./ButtonBar";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Performance from "./Performance";
import About from "./About";

//
const NavCard = (props) => {
  const { services, porfolio, performance, about } = props.data;
  const [activeButton, setActiveButton] = useState("");
  const [open, setOpen] = useState(false);

  const handleButtonChange = (buttonIndex) => {
    if (buttonIndex === activeButton) {
      setActiveButton(null);
      setOpen(false);
    } else {
      setActiveButton(buttonIndex);
      setOpen(true);
    }
  };

  const content = {
    a: {
      tilte: "Other services",
      componenet: <Services servicesData={services} />,
    },
    b: {
      tilte: "Work done for previous Employers",
      componenet: <Portfolio porfolioData={porfolio} />,
    },
    c: {
      tilte: "Check Freelancer stats and feedback to assess performance",
      componenet: <Performance performanceData={performance} />,
    },
    d: { tilte: " ", componenet: <About aboutData={about} /> },
  };

  return (
    <div className="w-full">
      {/* Nav menu */}
      <nav className="relative flex justify-between items-center bg-[#f8f8f8] text-[#333] w-full h-[51px] border border-gray-300 rounded-[3px] mt-4">
        <ButtonBar
          icon={<HiLink />}
          text="MORE SERVICES"
          borderLine="r"
          content={content}
          onChange={() => handleButtonChange(0)}
          active={activeButton === 0}
        />
        <ButtonBar
          icon={<ImImage />}
          text="PORTFOLIO"
          borderLine="r"
          content={content}
          onChange={() => handleButtonChange(1)}
          active={activeButton === 1}
        />
        <ButtonBar
          icon={<AiFillLike />}
          text="PERFORMANCE"
          borderLine="r"
          content={content}
          onChange={() => handleButtonChange(2)}
          active={activeButton === 2}
        />
        <ButtonBar
          icon={<FaUser />}
          text="ABOUT"
          borderLine=""
          content={content}
          onChange={() => handleButtonChange(3)}
          active={activeButton === 3}
        />
      </nav>

      {/* drop down box */}
      {open ? (
        <div
          className={`w-full h-auto border border-[#3773b7] p-6 ${content.d.tilte}`}
        >
          {/* Head title */}
          {activeButton !== 3 && (
            <div className="font-semibold text-[1em] w-full pb-4 mb-4 border-b border-[#3773b7]">
              {activeButton === 0 && <h3>{content.a.tilte}</h3>}
              {activeButton === 1 && <h3>{content.b.tilte}</h3>}
              {activeButton === 2 && <h3>{content.c.tilte}</h3>}
            </div>
          )}

          {/* Content */}
          {activeButton === 0 && <>{content.a.componenet}</>}
          {activeButton === 1 && <>{content.b.componenet}</>}
          {activeButton === 2 && <>{content.c.componenet}</>}
          {activeButton === 3 && <>{content.d.componenet}</>}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavCard;
