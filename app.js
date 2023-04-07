import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

import userRouter from './Routes/user.js'
import streamRouter from './Routes/stream.js'
import seasonRouter from './Routes/season.js'
import episodeRouter from './Routes/episode.js'
import seriesRouter from './Routes/series.js'
import genreRouter from './Routes/genre.js'

const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/user', userRouter);
app.use('/stream', streamRouter);
app.use('/season', seasonRouter);
app.use('/episode', episodeRouter);
app.use('/series', seriesRouter);
app.use('/genre', genreRouter);
//*hello how are you hello i'm the khizer why the hell the i do this

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});