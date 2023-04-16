import { useState, useEffect } from "react";
import Navabar from "./components/Navabar";
import ListUsers from "./components/ListUsers";
import Footer from "./components/Footer";
import { request } from "graphql-request";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

//icons
import { CiBoxList } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { BiFilter } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

//firebase auth
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";

//

// main component
function App() {
  let { id } = useParams();
  let pageNumber = Number(id);
  const navigate = useNavigate();
  const [dataList, setDataList] = useState(null);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(pageNumber || 1);
  const [totalPages, setTotalPage] = useState(300);

  //navigate
  const before = () => {
    number > 1 && setNumber(number - 1);
  };

  const after = () => {
    number < totalPages && setNumber(number + 1);
  };

  useEffect(() => {
    fetch(`https://node-sourcelander-api.vercel.app/api/page/1`)
      .then((response) => response.json())
      .then((data) => setDataList(data.list))
      .catch((error) => setError(error));

    fetch(`https://node-sourcelander-api.vercel.app/api/info-pages`)
      .then((response) => response.json())
      .then((data) => setTotalPage(data.totalPages))
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    //
    fetch(`https://node-sourcelander-api.vercel.app/api/page/${id}`)
      .then((response) => response.json())
      .then((data) => setDataList(data.list))
      .catch((error) => setError(error));
    navigate(`/${number}`);
  }, [number, id]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!dataList) {
    return <Loading />;
  }

  return (
    <div className="w-full  bg-white">
      <Navabar />

      {/*  */}

      <div className="flex justify-center items-center mt-[72px] w-full h-[90px] mb-5 border-b border-[#eee]">
        <div className="flex flex-col items-start justify-center w-full max-w-[982px] px-4 md:px-0">
          <h1 className=" font-semibold text-lg">Find and Hire Freelancers</h1>
          <p className="text-[#666] font-semibold">
            We found {totalPages * 20} Freelancers offering freelancing services
            online.
          </p>
        </div>
      </div>
      <article className="flex justify-center w-full pt-5">
        <div className="flex flex-col max-w-[982px] pt-0 pb-20">
          {/* Filters */}
          <nav className="hidden flex w-full items-center justify-between h-[52px] overflow-hidden mb-10 gap-4">
            <div className="flex items-center bg-[#FAFAFA] border border-x border-gray-300 h-full w-full lg:w-[80%]">
              <button className="hidden md:flex justify-around h-full items-center w-[22%] border-r border-gray-300 px-4 hover:bg-gray-400/20 outline-none ">
                {" "}
                <span className="pr-1  flex items-center">
                  <CiBoxList />
                </span>{" "}
                Any Category
              </button>
              <input
                type="text"
                placeholder="Search Freelancers"
                className="w-full md:w-[75%] h-full placeholder:text-gray-400 outline-none rounded-none px-4"
              />
              <button className="flex items-center justify-center  text-lg w-[52px] outline-none  border-l h-full  border-gray-300 hover:bg-gray-400/20">
                <AiOutlineSearch />
              </button>
            </div>
            <button className="hidden lg:flex border-[1px] border-gray-300 rounded-sm outline-none hover:border-gray-500 justify-center items-center h-full px-6 text-[#666]">
              {" "}
              <span>
                <ImLocation />
              </span>{" "}
              Location
            </button>
            <button className="hidden lg:flex border-[1px] border-gray-300 rounded-sm outline-none hover:border-gray-500 justify-center items-center h-full px-6 text-[#666]">
              {" "}
              <span>
                <BiFilter />
              </span>{" "}
              Filter
            </button>
          </nav>

          {/* top */}
          <nav className="flex w-full items-center px-5 bg-[#FAFAFA] h-[52px] overflow-hidden border border-x border-gray-300">
            <span>1,200 Results</span>
          </nav>

          {/* list of users */}
          <ListUsers dataList={dataList} />

          {/* pagination */}
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
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default App;

/* 
 //Initial Copy 
 <div className="flex justify-center items-center mt-[72px] py-5 border-b border-gray-300">
 <div className=" md:max-w-[984px]">
   <h1 className="text-[1.2em] font-semibold text-[#333]">
     Find and Hire Freelancers
   </h1>
   <span className="text-[1.2em] font-semibold text-[#666]">
     We found 1,517,976 Freelancers offering 2,928,744 freelancing
     services online.
   </span>
 </div>
</div>
*/
