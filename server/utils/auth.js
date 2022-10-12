import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
const token = sign({ d: "dd" }, "secret", { expiresIn: 300 });
console.log(token);
const verifycode = verify(token, "secret");
console.log(verifycode);

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

export function authMiddleware(req, res, next) {
  // allows token to be sent via  req.query or headers
  let token = req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
  }

  // verify token and get user data out of it
  try {
    const { data } = verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }

  // send to next endpoint
  next();
}
export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return sign({ data: payload }, secret, { expiresIn: expiration });
}
