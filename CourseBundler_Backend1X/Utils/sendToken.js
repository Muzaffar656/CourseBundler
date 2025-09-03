 const sendToken  = (res,user,message,statusCode=200)=>{

    const token = user.getJWTToken();

    const option = {
        expires:new Date(Date.now()+15 * 60 * 60* 1000),
  httpOnly: true,
  secure: true, // ✅ ONLY for localhost
  sameSite: "none", // or 'strict'
    }

    

    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        message,
        user
    })
}

export default sendToken
