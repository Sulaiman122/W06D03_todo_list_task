const fs = require("fs");

let todos = []
fs.readFile("./db/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
        todos = JSON.parse(data);
    }
  });


const gettodo = async(req, res) => {
    let myVar =await req.body.email
    let myUser = todos.find((item) => item.email == myVar);
    console.log();
    if(myUser.todos.length==0){
    res.status(200).json([])
    }else{
    res.status(200).json(myUser.todos)

    }
};

const deletetodo = async(req, res) => {
    let myVar =await req.body.email
    let index =await req.body.index
    let myUser = todos.find((item) => item.email == myVar);
    todos[todos.indexOf(myUser)].todos.splice(index,1)
    fs.writeFile("./db/users.json", JSON.stringify(todos), (err) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log("wrote in json");
        }
      });
    res.status(200).json(myUser.todos)
};

const addtodo = (req, res) => {
      let myUser = todos.find((item) => item.email == req.body.email);
      todos[todos.indexOf(myUser)].todos.push(req.body.todos[req.body.todos.length-1]);
      fs.writeFile("./db/users.json", JSON.stringify(todos), (err) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log("wrote in json");
        }
      });
    res.status(200).json('success');
};

module.exports = {
    addtodo,
    gettodo,
    deletetodo,
};
