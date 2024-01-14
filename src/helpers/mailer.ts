import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'programming582@gmail.com', // gmail
              pass: process.env.MAIL_PASSWORD, // pass
            },
          });

          const sendMail = async function (){
            let info = await transporter.sendMail({
                from: '"Your Account" <programming582@gmail.com>', // sender address
                to:email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                     </p>`
              });
            return info;
        }
        const response = await sendMail();
        console.log(response);
        

    } catch (error:any) {
        throw new Error(error.message);
    }
}