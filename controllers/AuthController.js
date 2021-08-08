const userSchema = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns
 */
exports.register = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((response) =>
          res
            .status(201)
            .json({ message: "User created successfully!", data: response })
        )
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.login = (req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({ message: "Authentication Failed" });
      }

      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        "longer-secret-is-better",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        data: getUser,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    });
};
