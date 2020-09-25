const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./model/models");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routers/user");

const app = express();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Hello World ${PORT}`);
});

mongoose
  .connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(error);
  });

app.post("/", (req, res) => {
  console.log("abc", req.body);
  (task = req.body.task), (completed = false);

  let newTodo = new Todo({
    task: task,
    completed: completed,
  });

  newTodo
    .save()
    .then((todo) => {
      res.send(todo);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  Todo.find((err, result) => {
    res.send(result);
  });
});

app.get("/:id", (req, res) => {
  Todo.findById(req.params.id, (err, result) => {
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log("tus", req.params.id);
  Todo.remove({ _id: req.params.id })
    .then(() => {
      res.send("remove completed");
    })
    .catch((err) => {
      console.log(error);
    });
});

app.post("/update/:id", (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {
    ...req.body,
    completed: !req.body.completed,
  })
    .then(() => {
      res.send(!req.body.completed);
    })
    .catch((err) => {
      console.log(error);
    });
});
