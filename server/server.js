const express = require("express");
const bodyParser = require('body-parser')
const router=require('./Routers/index')
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors=require("cors");
dotenv.config();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port =process.env.PORT||8080
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));


app.use('', router)



app.listen(port, () => {
    console.log(`Server is running on port ${port}.....`);
})
