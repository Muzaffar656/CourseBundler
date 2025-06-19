import { createTransport } from "nodemailer";

export const EmailVerification = async (option)=>{
    const transport = await createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for port 465, false for other ports
        service : 'Gmail',
        auth: {
          user: "hussainmuzaffar656@gmail.com",
          pass: "rbpg sxrs kncx uwns",
        },
    })
    const mailOption =  {
        from: '"Maddison Foo Koch 👻" <hussainmuzaffar656@gmail.com>', // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
       
        html: option.html, // html body
    }
    await transport.sendMail(mailOption)
}

