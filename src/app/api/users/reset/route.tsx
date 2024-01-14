import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {password,confirmpassword,token} = reqBody
        console.log("pass=",password,"confirmpass=",confirmpassword,"token=",token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            console.log("token error")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        // user.isVerified = true;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // update user password
        await User.findByIdAndUpdate(user._id, 
            {password: hashedPassword})

        // await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        console.log("error in catch")
        return NextResponse.json({error: error.message}, {status: 500})
    }

}