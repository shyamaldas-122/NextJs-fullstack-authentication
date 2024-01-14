"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast,Toaster} from "react-hot-toast";
import { ArrowRight } from 'lucide-react'





export default function ResetPage() {

    const [token, setToken] = useState("");
    const [error, setError] = useState(false);

    // const [btnmsg, Setbtnmsg]=useState("Reset Password")
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
    const [user, setUser] = React.useState({
        password: "",
        confirmpassword:"",
       
    })

    const [errors, setErrors] = useState({
      password: "",
      confirmpassword:"",
      match:""
    });
  
    const validatePassword = (password:any) => {
      // Password should be at least 6 characters
      return password.length >= 6;
    };

    const validateForm = () => {
      const newErrors = {
        password: "",
        confirmpassword:"",
        match:""
      };
  
      if (!user.password) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(user.password)) {
        newErrors.password = "Password should be at least 6 characters";
      }

      if (!user.confirmpassword) {
        newErrors.confirmpassword = "Password is required";
      } else if (!validatePassword(user.confirmpassword)) {
        newErrors.confirmpassword = "Password should be at least 6 characters";
      }

      if (user.password!=user.confirmpassword) {
        console.log("password not match");
        
        newErrors.match = "Password do not match";
      }
  
      setErrors(newErrors);
  
      // Check if there are no errors
      return Object.values(newErrors).every((error) => error === "");
    };
  

    const resetUserPassword = async () => {
      if(token.length > 0){
        try {
          console.log(validateForm());
          
          if (validateForm()) {
            setLoading(true)
            console.log("In reset page",user)
            // console.log("only token",token)

            await axios.post('/api/users/reset', {...user,token:token})
            // setResetsuccess(true);
            toast.success("Password Reset Successful!")
            router.push("/login")
          }else{
            const errmsg=errors.password || errors.confirmpassword || errors.match
            toast.error(errmsg)
          }
        } catch (error:any) {
            setError(true);
            console.log(error.message);
            toast.error(error.message)
        } finally{
          setLoading(false)
        }
      }
      else{
        toast.error("No Reset Token found.")
      }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(user.confirmpassword.length > 0 && user.password.length > 0) {
            if(user.password!=user.confirmpassword)
            {
                setButtonDisabled(true);
            }
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <section>
          <div>
          <Toaster
          position="top-center"
          reverseOrder={false}
          />
          </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <svg
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Enter New Password
          </h2>
          <div className="mt-8">
            <div className="space-y-5">
            <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    New Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    type="password"
                    value={user.password}
                    placeholder="New Password"
                    onChange={(e) => setUser({...user, password: e.target.value})}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    type="password"
                    value={user.confirmpassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setUser({...user, confirmpassword: e.target.value})}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  onClick={resetUserPassword}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  {
                  loading?
                  (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 50 50"
                      style={{ textAlign: "center", fontSize: "15px", width: "30px" }}
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        stroke="#ccc"
                        strokeDasharray="31.41592653589793 31.41592653589793"
                      >
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  )
                  :
                  (
                  "Reset Password"
                  )
                  }
                  {buttonDisabled==false && loading==false && <ArrowRight className="ml-2" size={16}/>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )

}