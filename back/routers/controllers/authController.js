const fs = require("fs");

let users = [];
  fs.readFile("./db/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      users = JSON.parse(data);
    }
  });

  
const register = (req, res) => {

  let alreadyUsedEmail = users.find((item) => item.email == req.body.email);
  if (!alreadyUsedEmail) {
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      todos: []
    });
    fs.writeFile("./db/users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("wrote in json");
      }
    });
    res.status(200).json({ status: true, name: req.body.name });
  } else {
    res.status(200).json({ status: false, errMessage: "Email is taken" });
  }
};

const login = (req, res) => {
  fs.readFile("./db/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      users = JSON.parse(data);
    }
  });
  let valid = users.find((item) => {
    return req.body.email == item.email && req.body.password == item.password;
  });

  if (valid) {
    res.status(200).json({ status: true });
  } else {
    res
      .status(200)
      .json({ status: false, errMessage: "Incorrect Email or Password" });
    console.log(false);
  }
};

module.exports = {
  register,
  login,
};
