import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import { createRequestLog } from './middleware/MongoDBLogs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(cookieParser());

app.use(compression());
app.use(bodyParser.json());

app.use('/', router());
// Apply middleware globally
app.use(createRequestLog);
const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server Running on localhost:8080");
});

const MONGO_URL = 'mongodb+srv://elale84:Deadhead_1@cluster0.4wro2mt.mongodb.net/?retryWrites=true&w=majority';


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

