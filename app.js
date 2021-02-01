import express from 'express';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js'

import dotenv from 'dotenv';
dotenv.config({path: '.env'});

try {
  await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
  console.log("MongoDB conectado!");
} catch (err) {
console.log("Erro ao conectar no MongoDB " + err);
}

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
