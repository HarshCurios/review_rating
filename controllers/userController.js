const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("fs");

const userSchema = require("../models/userSchema");
const { transporter } = require("../service/emailService");

let createUser = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: false,
        message: "User is already registered With this email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      const filePath = `/uploads/user/${req.file.filename}`;
      userData.profilePic = filePath;
      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        createdUser: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const userLogIn = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        }); //! jwt = userData ko object form me leta hai
        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not recognized with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

//User  Send Email for reset password API
const sendUserPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "harshitsharma0529@gmail.com",
        to: userEmail,
        subject: "Email for user reset Password",
        html: `<a href=${link}>click on this for reset password`,
      });
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Please enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password updated successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Password and confirmPassword does not match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: `Please enter valid email`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur : ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  userLogIn,
  sendUserPasswordEmail,
  resetPassword,
};
