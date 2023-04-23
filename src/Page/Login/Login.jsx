import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const FormRegister = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/1");
        //console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode, errorMessage);
        setMessage(errorCode.split("/")[1]);
        setTimeout(() => setMessage(""), 4000);
      });
  };

  return (
    <form className="flex flex-col justify-between px-4 py-20 flex-wrap   items-start w-[90%] h-[100%]">
      <h1 className="w-full text-center font-semibold text-[#4f86c4] text-3xl">
        Log In
      </h1>

      <div className="h-[42px] w-full text-center text-[#666] text-[.9em] mt-6 ">
        {message}
      </div>

      <div className="w-full flex flex-wrap justify-start overflow-hidden mb-2">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="w-full h-[40px] border border-[#4f86c4] rounded-0 bg-white p-2 focus:outline-none focus:border-blue-500 mb-6"
          autoComplete="@gmail.com @outlook.com"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-[40px] border border-[#4f86c4] rounded-0 bg-white p-2 focus:outline-none focus:border-blue-500 mb-4"
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>

      <div className="flex justify-between w-full text-sm">
        <div className="flex items-center mr-4">
          <input
            id="green-checkbox"
            type="checkbox"
            name="rememberMe"
            className="w-4 h-4 appearance-none bg-slate-300 checked:bg-[#3688d5] cursor-pointer"
          />
          <label
            htmlFor="green-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800 cursor-pointer"
          >
            Keep me logged in
          </label>
        </div>
      </div>
      <div className="flex justify-end w-full mt-12">
        <button
          type="submit"
          onClick={onLogin}
          className=" transition ease-in-out duration-300 font-semibold  text-white bg-[#4f86c4]  hover:bg-[#69b0d1] rounded-[2px] py-2 px-4 w-full md:w-[28%] "
        >
          Log in
        </button>
      </div>
    </form>
  );
};

function Login(props) {
  return (
    <div className="w-full h-screen grid place-content-center bg-gray-100">
      <div className="flex shadow-md md:max-w-[780px]">
        {/* image slider */}
        <div className="hidden md:flex flex-col items-center justify-between w-[40vw] h-[68vh] min-w-[390px]   bg-[#4f86c4] py-20 px-8">
          <h3 className="text-[1.8em] w-full text-center font-semibold text-white">
            Grow with sourcelancer
          </h3>
          <div className="w-[70%] h-[60%]">
            <img src="/team.png" alt="" className="object-contain w-full" />
          </div>
          <div className="flex flex-wrap w-full h-auto">
            <p className="w-full text-center font-semibold text-gray-100 mb-2">
              Get your invitation
            </p>
            <p className="w-full text-center text-gray-100">
              99% Customer Satisfaction
            </p>
            <p className="w-full text-center text-gray-100">
              Based on paid invoices
            </p>
          </div>
        </div>

        {/* dynamic content */}
        <div className="flex justify-center min-w-[390px] w-[100vw] h-[100vh] md:w-[40vw] md:h-[68vh] bg-white">
          <FormRegister />
        </div>
      </div>
    </div>
  );
}

export default Login;
