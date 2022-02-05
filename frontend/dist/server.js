"use strict";
const express = require("express");
const appp = express();
const port = 8080; // default port to listen
appp.use(express.static('./dist'));
// start the Express server
appp.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
