const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db/connection");
const users = db.get("users");
users.createIndex("username", { unique: true });

const router = express.Router();

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
});

function createTokenSendRespond(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  };
  jwt.sign(payload, process.env.TOKEN_SECRET,{
      expiresIn: '1d'
  }, (err, token) =>{
      if (err) {
        respondError422(res, next);
      } else {
          res.json({token});
      }
  });
  
}

router.get("/", (req, res) => {
  res.json({
    message: "authentication service",
  });
});

router.post("/signup", (req, res, next) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          const error = new Error("That user is already on db.");
          res.status(500);
          next(error);
        } else {
          bcrypt.hash(req.body.password.trim(), 12).then((hashPass) => {
            const newUser = {
              username: req.body.username,
              password: hashPass,
            };
            users.insert(newUser).then((insertUser) => {
              // delete insertUser.password;
              // res.json(insertUser);
              createTokenSendRespond(insertUser, res ,next)
            });
          });
        }
      });
  } else {
    res.status(406);
    next(result.error);
  }
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error("Unable to login.");
  next(error);
}

//research rate limiting express
router.post("/login", (req, res, next) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
              createTokenSendRespond(user,res,next);
            } else {
              respondError422(res, next);
            }
          });
        } else {
          respondError422(res, next);
        }
      });
  } else {
    respondError422(res, next);
  }
});

module.exports = router;
