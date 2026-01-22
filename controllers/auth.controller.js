import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/GenerateToken.js";

//----------------------------------------

// cookie meta data
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  secure: true,
  sameSite: 'None', 
}
//----------------------------------------


//Register function

export const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password, course, year } = req.body;

    if (!name || !email || !password || !course || !year) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
      course,
      year
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        course: user.course,
        year: user.year
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//-----------------------------------------

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate token and save cookie
    const token = generateToken(user);

     res.cookie('token', token, cookieOptions);


 res.status(200).json({
      success: true,
      message: "User login successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });
};


// Get logged-in user
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};





// Update user profile
export const updateUserProfile = async (req, res,next) => {
  try {
    const { name, email, course, year } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,   // coming from auth middleware
      {
        name,
        email,
        course,
        year
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-password"); // never send password back

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

