const dotenv = require("dotenv");
dotenv.config();

const connectToMongoose = require('./db')
var cors = require('cors')
connectToMongoose();

const express = require('express')
const app = express()


const port = process.env.PORT || 5000;
const path = require('path');


app.use(cors())
app.use(express.json())


//Availabe rotues
app.use('/api/auth', require('./routers/auth'));
app.use('/api/details', require('./routers/details'));



if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.join("./user-data/build")));



}





const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


