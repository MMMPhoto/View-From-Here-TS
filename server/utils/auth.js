import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
// const token = sign({ d: "dd" }, "secret", { expiresIn: 300 });
// const verifycode = verify(token, "secret");

// console.log(verifycode);
// console.log(token);

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

export function authMiddleware(req, res, next) {
  // allows token to be sent via  req.query or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
  }

  // verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }

  // send to next endpoint
  next();
}
export function signToken({ email, _id }) {
  const payload = { email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
