const User = require("../Model/login-auth.js");
const bcrypt = require("bcrypt");
const json = require("jsonwebtoken")

const registerUser = async (req, res) => {
  try {
    //get user detials from Payload
    // console.log("Reqqqqqqqq", req.body);
    const {username, email, password, role} = req.body;

    const checkExistingUser = await User.findOne({$or: [{username, email}]});
    console.log("checkExistingUser", checkExistingUser);
    if(checkExistingUser){
      res.status(400).json({
        success: false,
        message: "Enter diffrent username or email"
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("encryptedPassword", encryptedPassword)

      const createUser = await User.create({
        username, 
        email, 
        password: encryptedPassword,
        role: role || "user"
      });
  console.log("createUser", createUser);
  if(createUser){
     res.status(201).json({
      success: true,
      message: "User created successfully"
     })
  }
  else{
     res.status(400).json({
      success: false,
      message: "Cannot create User"
     })
  }
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
const loginUser = async (req, res) => {

  try{
    const {username, password} = req.body;
      console.log("Reeqq", req.body)
      const loginUser = await User.findOne({username});
      console.log("loginUser",loginUser)
     if(!loginUser){
   return res.status(404).json({
      success: false,
      message: "User not found, Please SignUp"
    })
     }

     const passwordMatched = await bcrypt.compare(password, loginUser?.password);
     console.log("passwordMatched", passwordMatched);
     
     if(!passwordMatched){
       return res.status(400).json({
          success: false,
          message: "Wrong Password"
        })
     }
    
    const accessToken = await  json.sign({
      useranme: loginUser?.username,
      email: loginUser?.email,
      role: loginUser?.role
    }, 
    "JSON_WEB_TOKEN",
    {expiresIn: "15m"}
  )
  res.status(200).json({
    success: true,
    message: "LoggedIn Succesfully",
    data: accessToken
  })
  }
  
  catch(error){
console.log("error", error)
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

module.exports = { registerUser, loginUser };
