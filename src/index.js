const express = require("express");
const app = express();
const morgan = require("morgan");

//settings
app.set("port",process.env.PORT || 3000);
app.set("json spaces",2);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use("/api/users",require("./routes/users"));

//start the server
app.listen(app.get("port"), ()=>{
    console.log("server started");
});