import { findUserById } from "../repository/userRepo.js";
import { verifyToken } from "../utils/tokenUtils.js";

const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ message: "invalid auth" });
    }

    const decoded = verifyToken(token, process.env.LOGIN_SIGNATURE);

    const user = await findUserById(decoded.id); //to prevent update a token

    if (!user) {  
      return res.status(400).json({ message: "user not found" });
    }

    if (!accessRoles.includes(user.role)) {
      return res.status(400).json({ message: "not auth user" });
    }

    req.id = decoded.id;
    req.role = user.role;

    next();
  };
};
export default auth;
