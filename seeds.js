require("dotenv").config();
const mongoose = require("mongoose");
const List = require("./lists");
const Username = require("./user");
const User = require("./user");
mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connetion open!");
  })
  .catch((err) => {
    console.log("oops error!");
    console.log(err);
  });
const x = async () => {
  const newUser = new Username({
    username: "kakarot2",
    password: "kakarot2",
  });
  await newUser.save();
  const list = new List({
    username: "kakarot2",
    data: ["i've to bath today!"],
  });
  await list.save();
  // const list = await List.findOne({ username: "goutham" });
  // const s = "i've to sleep";
  // list.data.push(s);
  // await List.updateOne({ username: "goutham" }, list, { runValidators: true });
};
x();
