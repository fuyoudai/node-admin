const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express();
const port = process.env.PORT || 5000
const { db } = require('./config/keys')

//引入模块
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

//使用静态资源中间件
app.use(express.static('public'))
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//passport初始化
app.use(passport.initialize())
require('./config/passport')(passport);

//使用routes
app.use("/api/users", users)
app.use("/api/profiles", profiles)

app.get("/", (req, res) => {
  res.send("server running")
})

// 通过mongoose连接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('连接数据库成功!!!')
    // 只有当连接上数据库后才去启动服务器
    app.listen(port, () => {
      console.log(`服务器启动成功, 请访问: http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })