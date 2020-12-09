import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoute';
import bookRoute from './routes/bookRoute';
import dotenv from 'dotenv';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

//mongoDB
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

//express app
const app = express();
app.use(bodyParser.json());

//routes
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);


app.listen(5000, () => {
    console.log(`Server started at 5000 `);
});