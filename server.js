const fs = require("fs");

const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString(),
    log = `${now} ${req.method} ${req.url}`;
  fs.appendFile("server.log", `${log}\n`, error => {
    if (error) {
      console.log("Unable to append to server.log");
    }
  });

  console.log(log);
  next();
});

// If in maintenance mode
// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "Megnate title"
//   });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("upper", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page",
    welcomeMessage: "welcome to portfolio"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fullfil this request."
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port} ...`);
});
