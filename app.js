// Import required modules
// require('dotenv').config();
// import dotenv from 
import 'dotenv/config'
import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// const express = require('express');
// const bodyParser = require('body-parser');

console.log(__filename);

// Create Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database (replace with a real database in production)
let tasks = [];

// Add this near your other route definitions
app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API');
});

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});