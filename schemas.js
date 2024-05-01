// schemas.js
const mongoose = require('mongoose');

// User Schema


const userSchema = new mongoose.Schema({
  username: String,
 
  password: String,
  
  role:String

  
  
});


const User = mongoose.model('User', userSchema);




const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignee_id: String,
  assigner_id: String,
  created_at: Date,
  updated_at: Date
});


const Task = mongoose.model('Task', taskSchema);







module.exports = { User,Task };