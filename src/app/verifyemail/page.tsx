"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse.data);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        {verified?
        <>
            <h2 className="text-3xl font-extrabold text-green-500 mb-6">Email Verified</h2>
            <p className="text-gray-600 mb-4">
            Your email has been verified successfully. You can now continue to login to your account.
            </p>
            <div className="mt-6">
            
                <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white no-underline font-semibold inline-block uppercase text-sm py-2 px-6 rounded-full"
                >
                Continue to Login
                </Link>
            </div>
            
        </>:
        <>
         <h2 className="text-3xl font-extrabold text-green-500 px-6 py-3">Verifying Email Address...</h2>
        </>
        }
        {error && (
            <div className="text-center">
                <h2 className=" text-white no-underline font-semibold inline-block uppercase text-sm py-2 px-6 rounded-full bg-red-500">Error</h2>
            </div>
        )}
      </div>
    </div>
        // <div className="flex flex-col items-center justify-center min-h-screen py-2">

        //     <h1 className="text-4xl">{verified?'Verification Successful!' : 'Verifying Email Address...'}</h1>
        //     <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            

        //     {verified && (
        //         <div>
        //             <h2 className="text-2xl">Email Verified</h2>
        //             <Link href="/login">
        //                 Login
        //             </Link>
        //         </div>
        //     )}
        //     {error && (
        //         <div>
        //             <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
        //         </div>
        //     )}
        // </div>
    )

}