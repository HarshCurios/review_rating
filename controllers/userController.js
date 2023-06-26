const userSchema = require('../models/userSchema');

let createUser = async (req , res) => {
  //console.log(req.body);
  const userData = new userSchema(req.body)
  try {
    const isUserExists = await userSchema.findOne({
      userEmail : req.body.userEmail
    })
    if(isUserExists){
      res.status(401).json({
        success : false ,
        message : "User is already registered With this Emails"
      });
    } else {
    //! const hashPassword = await bcrypt.hash(req.body.userPassword , 10);
    //! userData.userPassword = hashPassword
        const user = await userData.save();
        res.status(201).json({
          success : true ,
          message : "user registered successfully",
          user : user
        })
          }
  } catch (error) {
    res.status(500).json({
      success : false ,
      message : `Error occur ${error.message}`
    })
  }
  
}

module.exports = {
  createUser
}