const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const date = require(__dirname + "/date.js");
const day = date.getDate();

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todoDB");

// Items

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const defaultItems = [];

// Lists

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// Landing Page

// get data
app.get("/", async function (req, res) {
  try {
    const foundItems = await Item.find({});
    if (foundItems.length === 0) {
      res.render("list", { listTitle: day, newListItems: [] });
    } else {
      res.render("list", { listTitle: day, newListItems: foundItems });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// custom list

app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  try {
    const foundList = await List.findOne({ name: customListName });
    if (!foundList) {
      //Create a new list
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      await list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {
        listTitle: foundList.name,
        newListItems: foundList.items,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// post data
app.post("/", async function (req, res) {
  const itemName = req.body.todo;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    const foundList = await List.findOne({ name: listName });
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + listName);
  }
});

// delete data
app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === day) {
    await Item.findByIdAndDelete(checkedItemId);

    try {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    );

    try {
      res.redirect("/" + listName);
    } catch (error) {
      console.log(error);
    }
  }
});

app.listen("4000", function () {
  console.log("Server has started on the port 4000");
});
