require("dotenv").config();

const express = require("express");
const Router = require("./Routers/Router.js");
const cookieParser = require("cookie-parser");
const connect = require("./Configuration/database.js");
const cors=require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))



app.get("/hi", (req, res) => {
  res.send("helloji");
});

app.use("/auth", Router);

app.listen(8000, () => {
  console.log("start ");
});
console.log("coonect");

connect();
