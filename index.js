require("dotenv").config();
const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Username = require("./user");
const List = require("./lists");
const sessions = require("express-session");
const session = require("express-session");
const methodOverride = require("method-override");
mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("oops error!");
    console.log(err);
  });
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(urlencoded({ extended: true }));
app.use(
  sessions({
    secret: "sharingan key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 60 },
  })
);
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("list/index");
});
app.get("/kakarot/signup", (req, res) => {
  res.render("list/signup");
});
app.get("/isusernameavailable/:username", async (req, res) => {
  const username = req.params.username;
  const x = await Username.find({ username: username });
  if (x.length >= 1) {
    res.send("1");
  } else res.send("0");
});
app.post("/kakarot/insert", async (req, res) => {
  const data = req.body;
  const isavail = await Username.find({ username: data.username });
  if (isavail.length >= 1) {
    res.send("oops! user with this username already present!");
  } else {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    const newUser = new Username(data);
    await newUser.save();
    const newUserlist = new List({
      username: data.username,
      data: [],
    });
    await newUserlist.save();
    res.redirect("/");
  }
});
app.post("/kakarot", async (req, res) => {
  const userdata = req.body;
  const user = await Username.findOne({ username: userdata.username });
  if (user === null) res.send("wrong credentials!");
  else {
    req.session.username = user.username;
    const list = await List.findOne({ username: userdata.username });
    const isCorrectPassword = await bcrypt.compare(
      userdata.password,
      user.password
    );
    if (isCorrectPassword) res.render("list/list", { list });
    else res.send("wrong password");
  }
  // const data = res.render("list", {list});
});
app.get("/kakarot", async (req, res) => {
  const list = await List.findOne({ username: req.session.username });
  res.render("list/list", { list });
});
app.get("/kakarot/newtodo/:todo", async (req, res) => {
  const todo = req.params.todo;
  const userdata = await List.findOne({ username: req.session.username });
  userdata.data.push(todo);
  await List.updateOne({ username: req.session.username }, userdata, {
    runValidators: true,
  });
  res.sendStatus(200);
});
app.get("/kakarot/:string", async (req, res) => {
  const username = req.session.username;
  const string = req.params.string;
  const list = await List.findOne({ username: username });
  list.data.splice(list.data.indexOf(string), 1);
  await List.updateOne({ username: username }, list, {
    runValidators: true,
  });
  res.sendStatus(200);
});
app.listen(process.env.PORT || 3000, () => {
  console.log("app started!");
});
