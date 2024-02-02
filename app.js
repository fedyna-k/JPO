const express = require("express");
const path = require("path");

/**
 * The backend informations
 * @property {Express} app The express app
 * @property {number} port The express app port
 */
const backend = {
    app: express(),
    port: 3000
};

/**
 * The frontend informations
 * @property {Express} app The express app
 * @property {number} port The express app port
 */
const frontend = {
    app: express(),
    port: 5500
};


frontend.app.use(express.static(path.join(__dirname, "/frontend")));

frontend.app.listen(frontend.port, () => {
    console.log(`Frontend app listening on port ${frontend.port}`);
});