const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

const listItemRouter = require('./routes/listItemRouter.js')


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connection successful...")
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/items', listItemRouter)

app.listen(PORT, (err) => {
    err || console.log(`Server running on ${PORT}...`)
})