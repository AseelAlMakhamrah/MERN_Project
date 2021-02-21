const express = require('express');
// const cors = require('cors');
const app = express();

const authRoute = require('./server/routes/auth');
const postRoute = require('./server/routes/post');
const userRoute = require('./server/routes/user');

// Connected to Database
require('./server/config/mongoose.config');

// Middleware use
app.use(express.static('public'))
const { loginCheck } = require('./server/middleware/auth');
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// app.use(cors())

// All Routes
app.use('/', authRoute)
app.use('/', loginCheck, postRoute)
app.use('/', loginCheck, userRoute)

// Server Run
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})