import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        // if(user){
        //     return NextResponse.json({error: "User already exists"}, {status: 400})
        // }
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");

        //send verification email

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}