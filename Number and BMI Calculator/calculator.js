const express = require("express");
const body_parser = require("body-parser");

const app = express();
app.use(body_parser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/calculator.html");
});

app.post("/", function (req, res) {
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);
  var result;
  if (req.body.op === "+") result = n1 + n2;
  else if (req.body.op === "-") result = n1 - n2;
  else if (req.body.op === "*") result = n1 * n2;
  else if (req.body.op === "/") result = n1 / n2;
  else res.send("Invalid Operator");
  res.send("The result is:" + result);
});

app.get("/bmiCalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function (req, res) {
  let height = parseFloat(req.body.height);
  let weight = parseFloat(req.body.weight);

  let bmi = weight / (height * height);

  res.send("Your BMI is: " + bmi);
});

app.listen("4000", function () {
  console.log("Server has started.");
});
