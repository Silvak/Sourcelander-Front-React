import React from "react";
import { ImFacebook, ImTwitter } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";

const toSkills = [
  " Designers",
  "Writers",
  "Data Entry Experts",
  "Management Experts",
  "Marketers",
  "HTML Developers",
  "Microsoft Developers",
  "PHP Developers",
  "Editors",
  "Web Developers",
  "Graphic Designers",
  "JavaScript Developers",
  "CSS Developers",
  "Researchers",
  "Software Developers",
  "SQL Developers",
  "Web Designers",
  "Adobe Photoshop Designers",
  "English Language Experts",
  "WordPress Experts",
];

const services = [
  "PROGRAMMING & DEVELOPMENT",
  "DESIGN & ART",
  "WRITING & TRANSLATION",
  "SALES & MARKETING",
  "ADMINISTRATIVE & SECRETARIAL",
  "ENGINEERING & ARCHITECTURE",
  "BUSINESS & FINANCE",
  "LEGAL",
  "EDUCATION & TRAINING",
];

function Footer() {
  return (
    <div className="">
      {/* white gray */}
      <div className="w-full bg-[#F7F7F7] flex flex-wrap justify-center items-center px-4 py-14">
        <div className="w-full sm:w-[982px] grid grid-cols-2 md:grid-cols-4 gap-2">
          <h4 className="w-full col-span-2 md:col-span-4 text-[1em] font-semibold mb-4">
            Top Search Related Skills{" "}
          </h4>
          {toSkills.map((element, index) => (
            <p key={index} className="text-[.9em] text-[#666] col-span-1">
              {element}
            </p>
          ))}
        </div>
      </div>

      {/* white band */}
      <div className="w-full h-min bg-[#FFFFFF] flex justify-center items-center py-16 px-4">
        <div className="w-[982px] h-min flex flex-wrap">
          <h4 className="w-full text-[1em] font-semibold mb-6">
            Top Search Related Skills{" "}
          </h4>
          {services.map((element, index) => (
            <div
              key={index}
              className="flex justify-center items-center text-[.78em] text-[#666] border border-gray-300 px-4 h-[42px] rounded-sm font-semibold mr-3 mb-3"
            >
              {element}
            </div>
          ))}
        </div>
      </div>

      {/* end */}
      <div className="w-full min-h-[451px] bg-[#2b3247] flex flex-col items-center overflow-hidden">
        {/* links */}
        <article className="w-full flex flex-col sm:flex-row justify-between items-center max-w-[1200px]  gap-10 px-10 py-32">
          <div className="w-full  h-[150px] flex flex-col text-gray-200 gap-4">
            <h6 className="text-white font-semibold text-lg">Navigate</h6>
            <a href="" className="hover:underline">
              Home
            </a>
            <a href="" className="hover:underline">
              Jobs
            </a>
            <a href="" className="hover:underline">
              Solutions
            </a>
          </div>

          <div className=" w-full  h-[150px] flex flex-col text-gray-200  gap-4">
            <h6 className="text-white font-semibold text-lg">Company Info</h6>
            <a href="" className="hover:underline">
              About
            </a>
          </div>

          <div className="hidden sm:flex w-full  h-[150px] flex flex-col text-gray-200 gap-4">
            <h6 className="text-white font-semibold text-lg">Policies</h6>
            <a href="" className="hover:underline">
              Privacy Policy
            </a>
            <a href="" className="hover:underline">
              Terms of services
            </a>
          </div>

          <div className="w-full  h-[150px] flex flex-col text-gray-200  gap-4">
            <h6 className="text-white font-semibold text-lg">
              Connect With Us
            </h6>
            <div className="flex justify-between items-center max-w-[130px] ">
              <a
                href="/1"
                className=" bg-blue-600 text-white h-[34px] w-[34px] rounded-[20px] flex justify-center items-center hover:text-[#8DBFF8]"
              >
                <ImFacebook />
              </a>
              <a
                href="/1"
                className="bg-blue-400 text-white h-[34px] w-[34px] rounded-[20px] flex justify-center items-center hover:text-[#8DBFF8]"
              >
                <ImTwitter />
              </a>
              <a
                href="/1"
                className=" bg-sky-800 text-white h-[34px] w-[34px] rounded-[20px] flex justify-center items-center hover:text-[#8DBFF8]"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </article>

        {/* copyrigth */}
        <div className="w-full h-[10vh] border-t border-gray-200/20 flex justify-between items-center px-4 sm:px-10">
          {" "}
          <h6 className="flex items-center font-semibold text-white w-[60%]">
            Sourcelander{" "}
            <span className="text-gray-400 font-normal text-[.8em] ml-2">
              | Get Work Done
            </span>
          </h6>
          <div className="text-gray-400 w-[40%] text-right">
            Copyright © 2023, sourcelander.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
