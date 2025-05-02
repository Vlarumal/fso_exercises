const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./utils/db');
const { PORT } = require('./utils/config');
const blogRouter = require('./controllers/blogsRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/blogs', blogRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
