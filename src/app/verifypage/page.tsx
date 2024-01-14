import Link from "next/link";
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Account Verification</h2>
        <p className="text-gray-600 mb-4">
          Thank you for registering! An account verification link has been sent to your email
          address. Please click the link to activate your account.
        </p>
        <div className="mt-2 ">
        <Link href="/login"
        className="bg-green-500 hover:bg-green-600 text-white no-underline font-semibold inline-block uppercase text-sm py-2 px-6 rounded-full mt-6">
        Login to your Account
        </Link>
        </div>
        {/* Add additional elements, such as a countdown timer or a button to navigate elsewhere */}
      </div>
    </div>
  )
}