import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
//
import { auth } from "../../firebase";

function FormData(props) {
  const { children } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    if (auth.currentUser) {
      setOpen(!open);
    } else {
      setOpen(false);
      navigate("/login/account");
    }
  };

  open ? disableBodyScroll(document) : enableBodyScroll(document);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      {open && (
        <div className="fixed flex justify-center top-0 left-0 p-0 pt-8 md:py-20 z-[2000]  w-full overflow-y-auto h-[100vh] bg-gray-600/70">
          {/* container */}
          <div className="relative w-full md:w-[600px] h-[1460px] border  border-gray-500 rounded-[4px] bg-white ">
            {/* head */}
            <div className="flex justify-between items-center border-b border-gray-300 p-2">
              <p className="text-[#333] font-semibold">Get a Quote</p>

              <button onClick={handleOpen} className="px-2">
                <GrFormClose className="text-gray-400" />
              </button>
            </div>

            {/* form  */}
            <div className="w-full h-full">
              <Form freelance={props.freelance} handleOpen={handleOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormData;
