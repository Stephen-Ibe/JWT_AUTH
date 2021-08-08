const userSchema = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns
 */
exports.register = async (req, res, next) => {
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

