const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoutes');
const taskRoutes = require('./routes/TasksRoutes');
const teamRoutes = require('./routes/TeamRoutes');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.Atlas_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose default connection is done"))
  .catch((err) => {
    console.log('Mongoose default connection error: ' + err);
  });

app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoutes);
app.use('/api/team', teamRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Planner Plus API!",
    description: "This API powers the Planner Plus application's backend.",
    version: "1.0"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
