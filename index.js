require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001; // Use process.env.PORT or default to 3001
const { User, Task} = require('./schemas');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
app.use(cors());
app.use(express.json())


const initializeDBAndServer = async () => {
  try {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();




app.post('/register', async (request, response) => {

  try {
    console.log(request.body)
    const { username, password, role} = request.body;

    
    

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return response.status(400).json({ message: "Username already exists Please Login" });
      
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword,role });
      await newUser.save();
      
      response.json({ message: "User registered successfully" });

       
   } catch (findError) {
      console.error("Error finding user:", findError);
      response.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in registration endpoint:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});


app.post('/login', async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    console.log(user)
 

    if (!user) {

      response.status(400).json({ message: "Invalid Username, please Register" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
      if (isPasswordCorrect) {
        const payload = {username: user.username };
       
        const jwtToken = token.sign(payload, process.env.JWT_SECRET);
      
        response.status(200).json({ jwtToken });
      } else {
        response.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});


app.post('/task', async (request, response) => {
  try {
    // Extract data from request body
    const { title, description, status, assignee_id, assigner_id } = request.body;
    
    // Create a new Task document
    const newTask = new Task({
      title,
      description,
      status,
      assignee_id,
      assigner_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Save the new task to the database
    await newTask.save();

    // Respond with success message
    response.status(201).json({message:"Task recorded successfully"});
  } catch (error) {
    // Handle errors
    console.error("Error creating task:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    // Update the task status by ID
    await Task.updateOne({ _id: taskId }, { $set: { status: status } });

    res.json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Delete the task by ID
    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
