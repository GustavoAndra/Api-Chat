require("dotenv").config();
const app = require("../Src/api");

app.use((req,res, next)=>{
	next();
});

let port = process.env.API_PORT || 5000;

app.listen(port);

console.log("Starting in port " + port);