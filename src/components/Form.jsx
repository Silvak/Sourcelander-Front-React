import React, { useState } from "react";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineWallet } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";

export const typeWorkList = [
  "Programing & Development",
  "Design & Art",
  "Writing & Translation",
  "Administrative & Secretarial",
  `Business & Finance`,
  `Sales & Marketing`,
  `Engineering & Architecture`,
  "Legal",
  "Education & Training",
];

export const paymentList = ["Fixed Price", "Hourly", "Not Sure"];

export const fixedPriceList = [
  "Under $250",
  "$250 to $500",
  "$500 to $1,000",
  "$1,000 to $2,500",
  "$2,500 to $5,000",
  "$5,000 to $10,000",
  "$10,000 to $25,000",
  "Over $25,000",
  "Not sure/Confidential",
];

export const jobDurationList = [
  "Less than 1 week",
  "Less than 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "More than 6 moths / ongoing",
];

export const hoursPerWeekList = ["1-10", "10-30", "30+"];

const Form = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeWork, setTypeWork] = useState("Programing & Development");
  const [paymentQuotes, setPaymentQuotes] = useState("Fixed Price");
  const [fixedQuotes, setFixedQuotes] = useState("");

  //Hourly
  const [jobDuration, setJobDuration] = useState("");
  const [hoursWeek, setHoursWeek] = useState("");
  const [rateMin, setRateMin] = useState("");
  const [rateMax, setRateMax] = useState("");

  //send mail with quotes
  const sendQuote = (e) => {
    e.preventDefault();

    const data = {
      freelance: {
        name: props.freelance[1],
        work: props.freelance[2],
        location: props.freelance[3],
        budgetHour: props.freelance[4],
      },
      title: title,
      description: description,
      jobType: typeWork,
      paymentQuotes: `${
        paymentQuotes == "Fixed Price" ? `Fixed Price: ${fixedQuotes} ` : ""
      }
      ${
        paymentQuotes == "Hourly"
          ? `Hourly || Job Duration: ${jobDuration}, Hourk per Week: ${hoursWeek}, Rate/Hour: min[${rateMin}] ~ max[${rateMax}]`
          : ""
      }
      ${paymentQuotes == "Not Sure" ? "Not Sure" : ""}
      `,
    };

    // Envía los datos a la API utilizando fetch
    fetch("https://node-sourcelander-api.vercel.app/api/send-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje == "Mensaje enviado") {
          props.handleOpen();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form className="p-4 md:p-8:" onSubmit={sendQuote}>
      {/* Selected */}
      <div className="">
        <p className="mb-2 text-[.8em] text-left">
          Selected Freelanccer{"(s)"}
        </p>
        <div className="text-[.8em] border border-gray-300 rounded-full flex justify-start items-center  pl-[8px] py-1 w-min">
          <div className="h-6 w-6 overflow-hidden rounded-full ">
            <img src={props.freelance[0]} alt="" />
          </div>
          <p className="ml-3 mr-4 text-[#4C83C3] font-semibold whitespace-nowrap">
            {props.freelance[1]}
          </p>
        </div>
      </div>

      {/* Selected */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <p className="mt-10 mb-2 text-[.8em] ">Select a job to get quotes</p>
        <div className="flex w-full gap-4">
          <div className="flex text-[#4C83C3] font-semibold  p-2 w-[50%] h-[64px] border border-[#4C83C3] cursor-pointer">
            <VscNewFile className="mr-2" />
            <span className="text-[.8em] ">NEW JOB</span>
          </div>

          <div className="flex text-[#666]  p-2 w-[50%] h-[64px] border border-gray-200">
            <AiOutlineWallet className="mr-2" />
            <span className="text-[.8em] ">EXISTING JOB</span>
          </div>
        </div>
      </div>

      {/* title */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8">
        <p className="flex items-center  mt-10 mb-2 text-[.8em] w-[100%]">
          <span>
            <RiSuitcaseLine className="text-[1.2em] mr-2" />
          </span>{" "}
          Give your job a title
        </p>
        <div className="flex w-full gap-4">
          <input
            type="text"
            required
            placeholder="Develop AAndroid app for e-commerce site"
            className="text-[.8em] border border-gray-300 w-full px-2 h-[42px] outline-none"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
      </div>

      {/* textarea  */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8">
        <p className="flex items-center  mt-10 mb-2 text-[.8em] w-[100%]">
          <span>
            <RiSuitcaseLine className="text-[1.2em] mr-2" />
          </span>{" "}
          Describe the job in details
        </p>
        <div className="flex w-full gap-4">
          <textarea
            type="text"
            rows={4}
            cols={40}
            required
            placeholder="Develop AAndroid app for e-commerce site"
            className="text-[.8em] border border-gray-300 w-full p-2 h-[122px] outline-none"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
      </div>

      {/* Select */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8">
        <p className="flex items-center  mt-10 mb-2 text-[.8em] w-[100%]">
          <span>
            <RiSuitcaseLine className="text-[1.2em] mr-2" />
          </span>{" "}
          What work do you need to get done?
        </p>
        <div className="grid grid-cols-3  w-full gap-3">
          {typeWorkList.map((element, index) => (
            <button
              key={index}
              className={`${
                typeWork == element
                  ? "border border-[#4C83C3]"
                  : " border border-gray-300"
              }   py-1 px-2 text-[.9em] hover:bg-gray-100/90 min-h-[60px] `}
              onClick={(event) => {
                event.preventDefault();
                setTypeWork(element);
              }}
            >
              {element}
            </button>
          ))}
        </div>
      </div>

      {/* Payment  */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8 mb-24">
        <p className="flex items-center  mt-10 mb-2 text-[.8em] w-[100%]">
          <span>
            <RiSuitcaseLine className="text-[1.2em] mr-2" />
          </span>{" "}
          How do you want to pay for this job?
        </p>
        <div className="grid grid-cols-3  w-full gap-3">
          {paymentList.map((element, index) => (
            <button
              key={index}
              className={`${
                paymentQuotes == element
                  ? "border border-[#4C83C3]"
                  : " border border-gray-300"
              }  py-1 px-2 text-[.9em] hover:bg-gray-100/90 min-h-[60px] `}
              onClick={(event) => {
                event.preventDefault();
                setPaymentQuotes(element);
              }}
            >
              {element}
            </button>
          ))}
        </div>
        {paymentQuotes != "Not Sure" && (
          <div className="relative top-0 border border-[#4C83C3] w-full h-[180px] p-4">
            {paymentQuotes == "Fixed Price" && (
              <div className="flex pt-8 flex-col gap-1">
                <p className="text-[#333]">Choice a budget</p>
                <select
                  className="border border-gray-300 py-1 px-2 w-[50%]"
                  onChange={(e) => {
                    setFixedQuotes(e.target.value);
                  }}
                >
                  {fixedPriceList.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {paymentQuotes == "Hourly" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[#333]">Job duration</p>
                  <select
                    className="border border-gray-300 py-1 px-2 w-full"
                    onChange={(e) => {
                      setJobDuration(e.target.value);
                    }}
                  >
                    {jobDurationList.map((element, index) => (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-[#333]">Hours Per Week</p>
                  <select
                    className="border border-gray-300 py-1 px-2 w-full"
                    onChange={(e) => {
                      setHoursWeek(e.target.value);
                    }}
                  >
                    {hoursPerWeekList.map((element, index) => (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <p className="text-[#333] ">Rate/Hour</p>
                  <input
                    type="number"
                    required
                    placeholder="$ Minimum"
                    className="text-[.8em] border border-gray-300 w-full px-2 h-[33px] outline-none"
                    onChange={(event) => {
                      setRateMin(event.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <p className="text-[#333] mb-6"> </p>
                  <input
                    type="number"
                    required
                    placeholder="$ Maximun"
                    className="text-[.8em] border border-gray-300 w-full px-2 h-[33px] outline-none"
                    onChange={(event) => {
                      setRateMax(event.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* */}
      <div className="flex justify-between items-center absolute w-full py-3 px-8 bg-gray-200 bottom-0 left-0 rounded-b-[4px]">
        <button className=" bg-[#3773b7] text-white px-4 py-2 font-medium">
          Get a Quote
        </button>
      </div>
    </form>
  );
};

export default Form;
