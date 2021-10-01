const express = require('express')
const mongoose = require('mongoose')
const pg = require('pg');
const env = require('dotenv')
const db = require("./model");

const app = express()
env.config();
const PORT = process.env.PORT||5000
const todoRoute = require('./router/todorouter')
const userRoute = require('./router/userrouter')


app.use(express.json())
db.sequelize.sync();

app.use('/api/todo', todoRoute)
app.use('/api/user', userRoute)

app.get('/',function(req,res){
    res.send("working")
})


// var conString = process.env.ELEPHANTSQL_URL
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log("db connected")
//     console.log(result.rows[0].theTime);
    
//     client.end();
//   });
// });


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

