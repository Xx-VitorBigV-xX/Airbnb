//? https://yarnpkg.com/package?name=cors

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser=require('cookie-parser')
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'qwertyqwerty'; //! segundo parametro para o token login

app.use(express.json());
app.use(cookieParser()); //-> para ler cookies em json 
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      jwt.sign(
        { email: userDoc.email,
           id: userDoc._id,
           name:userDoc.name
           },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );

    } else {
      res.status(422).json("pas not ok");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get('/profile', (req,res)=>{
  const {token}=req.cookies;
  if(token){
jwt.verify(token,jwtSecret,{},async(err,userData)=>{
  if(err)throw err;
  const {name,email,_id} = await User.findById(userData.id);
  res.json({name,email,_id});
})
  }else{
    response.json(null)
  }

});

app.post('/logout',(req,res)=>{
    // Limpa o cookie 'token' definindo-o como uma string vazia
  res.cookie('token','').json(true);

});

app.listen(4000);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdG9vcmh1Z29hbWFyb0Bob3RtYWlsLmNvbSIsImlkIjoiNjZiN2NhM2Y4MDg4MzAxYzgyZWM5ZDQyIiwiaWF0IjoxNzIzNjYzMzk4fQ.g4M0dTqbw33aIDzG-kscz5zz9f9uQAgPHYtqzjslkO4