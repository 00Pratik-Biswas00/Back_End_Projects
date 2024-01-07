const express = require("express");
const body_parser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = ["Learn MERN", "Learn ML", "Do Projects"];
const workLists = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.todo;
  // console.log(req.body.list);

  if (req.body.list === "Work List") {
    workLists.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItems: workLists });
});

app.post("/work", function (req, res) {
  const workItems = req.body.todo;
  workLists.push(workItems);
  res.redirect("/work");
});

app.listen("4000", function () {
  console.log("Server has started on the port 4000");
});
