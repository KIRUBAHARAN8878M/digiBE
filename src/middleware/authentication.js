const jwt = require("jsonwebtoken");

let authenticate = (req, res, next) => {
  // console.log(req.headers);
  if (req.headers.authorization) {
    try {
      let decode = jwt.verify(req.headers.authorization, process.env.SEC);
      //  console.log(decode)
      if (decode) {
        req.user = {
          userId: decode._id,
        };
        // console.log(req.user)
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticate };
