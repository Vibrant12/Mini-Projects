const mongoose=require("mongoose");
const { Console } = require("console");
mongoose.connect("mongodb://localhost:27017/employee",{useUnifiedTopology :true});
let conn=mongoose.connection;
let schema=new mongoose.Schema({
     name:String,
     address:String,
     phone:String,
     email_id:String,
     salary:Number,
     image:String,

});

let model=mongoose.model("Employee",schema);
data=new model({
     name:"Rah kumar",
     phone:"9874561235",
     email_id:"rah@gmail.com",
     salary:5000000,
});
let addData=(()=>{
     conn.on("connected",()=>{console.log("connected")});
     conn.on("disconnected",()=>{console.log("not connected")});
     conn.on("error",console.error.bind(console,"error found"));
     conn.once("open",()=>{
          data.save((err,res)=>{
               if(err) throw err;
               return res;
          })
     })
})
module.exports=model;


