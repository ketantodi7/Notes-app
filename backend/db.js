const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/myNotes"
mongoose.connect(mongoUrl);

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl).then(() => console.log("connected sucessfully"));
}

module.exports = connectToMongo;