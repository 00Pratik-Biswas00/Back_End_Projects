module.exports.getDate = function () {
  const today = new Date();
  // const currDay = today.getDay();
  // const day = "";

  // if (currDay == 0) day = "Sunday";
  // else if (currDay == 1) day = "Monday";
  // else if (currDay == 2) day = "Tuesday";
  // else if (currDay == 3) day = "Wednesday";
  // else if (currDay == 4) day = "Thursday";
  // else if (currDay == 5) day = "Friday";
  // else if (currDay == 6) day = "Saturday";

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};
