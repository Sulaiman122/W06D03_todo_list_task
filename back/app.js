const express = require('express')
const morgan = require("morgan");
const cors = require("cors");

const authRoute = require("./routers/routes/authRoute");
const todoRouter = require("./routers/routes/todoRoute");

const app = express()
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use("/", authRoute);
app.use("/", todoRouter);


const PORT = 4500

app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
})