import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    //extract the incoming data
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing needed information",
      });
    }

    //encrypt the password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user & store it in db
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();

    //create the jwt & send it in a response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false }, { message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //extract the incoming data
    const { email, password } = req.body;

    //find the user in db by unique email:
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    //match the entered password to the hashed one in db
    const passwordMatch = await bcrypt.compare(password, user.password);

    //if the user logs in successfully, a token needs to be generated
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false }, { message: error.message });
  }
};

export { loginUser, registerUser };
