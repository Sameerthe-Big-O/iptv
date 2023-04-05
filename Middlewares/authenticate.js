import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).send("Access Denied.");
  }

  const bearerToken = token.split(" ")[1];

  const options = {
    expiresIn: "3h",
    algorithm: "HS256",
  };
  try {
    const decoded = jwt.verify(bearerToken, "My_secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token.");
  }
}
