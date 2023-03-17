const mongoose = require("mongoose");

connect = () => {
    mongoose.connect("mongodb://localhost:27017/devolution").then(() => {
        console.log("OK")
    }).catch((err) => {
        console.log("Erro: " + err)
    });
};

module.exports = {
    connect
};