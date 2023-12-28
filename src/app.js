import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:"*",
    credentials: true,
  })
);

app.use(express.json({limit: "25kb"}));
app.use(express.urlencoded({extended: true , limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes

import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)

export { app };
