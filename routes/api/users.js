const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
const { secretOrKey } = require('../../config/keys')
const passport = require('passport')

//请求地址 : /api/users/register
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "邮箱已被注册" })
    } else {
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar,
        identity:req.body.identity
      })
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        });
      });
    }
  })
})

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ message: "用户不存在" })
    }
    //密码匹配
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        const rule = {
          id:user.id,
          username:user.username,
          avatar:user.avatar,
          identity:user.identity
        }
        // jwt.sign("规则","加密名字","过期时间","箭头函数")
        jwt.sign(rule,secretOrKey,{expiresIn:3600},(err,token) => {
          res.json({
            code:true,
            message:"登录成功",
            token:"Bearer " + token
          })
        })
      } else {
        return res.status(400).json({ message: "密码错误!" })
      }
    })
  })
})

router.get("/current",passport.authenticate("jwt",{session:false}), (req, res) => {
  res.json({
    id:req.user.id,
    username:req.user.username,
    email:req.user.email,
    identity:req.user.identity
  });
})

module.exports = router