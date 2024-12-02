import User from "../models/UserModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    //check if user is authorized to generate an image & has provided input
    const { userId, prompt } = req.body;

    const user = await User.findById(userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing needed details" });
    }

    //check if user has enough credits
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No credits available",
        creditBalance: user.creditBalance,
      });
    }

    //if everything is okay, generate the image using Clipdrop
    //1. create needed form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    //2. send the data to the API via axios
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer", //used to represent raw binary data (image is stored in this manner)
      }
    );

    //converting binary data (image) into a base64-encoded string
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    //update credit balance
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
