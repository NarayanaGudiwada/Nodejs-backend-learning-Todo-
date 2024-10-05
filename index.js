const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
mongoose.connect(
  "mongodb+srv://narayanag:testpass@cluster-x.zmu2z.mongodb.net/?retryWrites=true&w=majority&appName=cluster-X"
);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    res.status(200).json({
      message: "you are registered successfullly",
    });
  } catch (e) {
    res.status(403).json({
      message: "User already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Invalid Credentials",
      });
    }
  } else {
    res.status(403).json({
      message: "Invalid User",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, tobeDoneBy } = req.body;
    const createdAt = Math.floor(Date.now() / 1000);

    if (createdAt > tobeDoneBy) {
      res.status(400).json({
        message: "Invalid completion Time",
      });
    } else {
      await TodoModel.create({
        userId,
        title,
        tobeDoneBy
      });
      res.status(200).json({
        message: "Success",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Interval Server Error",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId,
  });
  res.json(todos);
});

app.patch("/todo/:id/complete", auth, async (req, res) => {
  const userId = req.userId;
  const todoId = req.params.id;

  try {
    const todo = await TodoModel.findOne({
      userId: userId,
      _id: todoId,
    });

    if (todo) {
      if (todo.done) {
        res.status(400).json({
          message: "Todo is already marked as done",
        });
      } else {
        todo.done = true;
        await todo.save();

        res.status(200).json({
          message: "Todo marked as Done",
        });
      }
    } else {
      res.status(404).json({
        message: "Todo not found for the user",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Server error occured",
    });
  }
});

app.listen(3000, () => {
  console.log("app started");
});
