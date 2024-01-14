"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("Loading...")
    const [email, setEmail] = useState("Loading...")
    const [varify, setVarify] = useState(false)
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    // const getUserDetails = async () => {
    //     const res = await axios.get('/api/users/me')
    //     console.log(res.data);
    //     setData(res.data.data.username)
    // }
    useEffect(() => {
        const fetchData = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data.username)
        setEmail(res.data.data.email)
        setVarify(res.data.data.isVerified)
        }
        fetchData();
    }, []);

    return (
        <section className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2 rounded-lg">
            <div className="w-full lg:w-1/2 px-6 py-6 text-center">
                <div className="bg-white rounded shadow-lg overflow-hidden p-8"> 
                <div style={{width:"50%"}} className="m-auto pb-2">
                <img className="rounded-full" src="https://lh3.googleusercontent.com/proxy/WysB1VUo63PNH2eWcVN6J929RehISqj8_gYbmSC5oiZj7cSFAeFrPeUZViN3O5LUOSJUqNZvi1SBwlJzFDUeIpLYc7itSbB8VvqaIE6KV3363rMNOEzboLqVCr26LzjakeHLGIyzDQ"/>
                </div>
                {varify && <h2 className="bg-green-500 hover:bg-green-600 text-white no-underline font-semibold inline-block uppercase text-sm py-2 px-6 rounded-full mb-2">Verified User</h2>}
                <div className="font-bold text-xl mb-2">{data}</div>
                <p className="text-grey-darker text-base mb-4">{email}</p>
                <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={logout}>Logout</button>
                </div>
            </div>
        </section>
    )
}