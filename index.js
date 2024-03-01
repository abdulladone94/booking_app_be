import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/hotel', hotelsRoute);
app.use('/api/room', roomsRoute);

app.listen(8800, () => {
  connect();
  console.log('Connected to backend on port 8800');
});
