require("dotenv").config();

const PORT = process.env.PORT;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express router
const accounts = require("./api/accounts");

app.use("/accounts", accounts);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
