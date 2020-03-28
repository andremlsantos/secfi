const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.get_all = (req, res, next) => {
  User.find()
    .select("firstName lastName userName password avatar")
    .exec()
    .then(users => {
      res.status(200).json({
        total: users.length,
        users: users
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.get = (req, res, next) => {
  User.findById(req.params.userId)
    .select("firstName lastName userName password avatar")
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      res.status(200).json({
        user: user,
        request: {
          type: "GET",
          url: "localhost:3000/users"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create = (req, res, next) => {
  User.findOne({ userName: req.body.userName })
    .exec()
    .then(user => {
      if (user) {
        console.error("Username already taken!");
        return res.status(404).json({ message: "Username already taken!" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          }

          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hash,
            avatar: req.file != null ? req.file.path : null
          });

          user
            .save()
            .then(result => {
              console.log("User created successfully!", result);
              res.status(201).json({
                message: "User created successfully!",
                user: user
              });
            })
            .catch(err => {
              console.error("Probelms creating user.")
              res.status(500).json({
                error: err
              });
            });
        });
      }
    });
};

exports.update = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .exec()
    .then(user => {
      if (!user) {
        console.log("User not found")
        return res.status(400).json({ 
          error: "User not found" 
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          const firstName = req.body.firstName != null ? req.body.firstName : user.firstName;
          const lastName = req.body.lastName != null ? req.body.lastName : user.lastName;
          var password = null;
          const avatar = req.file != null ? req.file.path : user.avatar;

          if (err) {
            // Password was not sent with request, we use old one
            password = user.password;
          } else {
            // Password was sent
            password = hash;
          }

          const newUser = {
            _id: user._id,
            firstName: firstName,
            lastName: lastName,
            password: password,
            avatar: avatar
          };

          User.updateOne({ _id: user._id }, { $set: newUser }).exec()
          .then(result => {
            console.log("User updated");
            res.status(200).json({
              message: "User updated",
              request: {
                type: "GET",
                url: "http://localhost:3000/users/" + user._id 
              }
            })
          })
        });
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
};

exports.delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
        request: {
          type: "GET",
          url: "localhost:3000/users"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
