import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    //token is signed using the userId, so when decoded, it returns id (which will from now on be stored in request body)
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      res.json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    res.json({ success: false }, { message: error.message });
  }
};

export default userAuth;
