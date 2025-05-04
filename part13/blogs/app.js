const express = require('express');
const cors = require('cors');

const { connectToDatabase, sequelize } = require('./utils/db');
const { PORT } = require('./utils/config');
const errorHandler = require('./middleware/errorHandler');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const authorRouter = require('./routes/authorRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

app.use(errorHandler);

let server;

const start = async () => {
  await connectToDatabase();
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();

let shuttingDown = false;

const shutdownServer = async () => {
  try {
    await new Promise((resolve, _reject) => {
      server.close(() => {
        console.log('HTTP server is closed.');
        resolve();
      });
    });

    await sequelize.close();
    console.log('Database connection closed.');

    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

const forceShutdownTimeout = () => {
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcing shutdown'
    );
    process.exit(1);
  }, 10000);
};

const gracefulShutdown = async () => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('Shutting down gracefully...');

  forceShutdownTimeout();

  try {
    await shutdownServer();
  } catch (error) {
    console.error('Shutdown error:', error);
    process.exit(1);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
