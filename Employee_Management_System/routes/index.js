var express = require('express');
let model=require("../modules/employee");
let parser=require("body-parser");
let multer=require("multer");
let path=require("path");
var router = express.Router();
let data=model.find({});
/* GET home page. */
router.use(express.static(__dirname+"/public/"));
var Storage= multer.diskStorage({
  destination:"./public/uploads",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('file');

router.get('/', function(req, res, next) {
  data.exec((err,result)=>{
    if(err) throw err;
    res.render('index', { title: 'Employee Data',records:result });
  })
  
});
router.post('/', upload,function(req, res, next) {
  let details=new model({
          name:req.body.name,
          email_id:req.body.email,
          address:req.body.address,
          phone:req.body.phone,
          image:req.file.filename,

  });
  details.save((err,res1)=>{
    if(err) throw err;
    data.exec((err,result)=>{
      if(err) throw err;
      res.render('index', { title: 'Employee Data',records:result });
    })
  })
  
});
router.post('/filter', function(req, res, next) {
  let filter={};
   let filterByName=req.body.name;
   let filterByEmail=req.body.email;
   let filterByPhone=req.body.phone;
   if(filterByName!=''&&filterByPhone!=''&&filterByEmail!=''){
     filter={$and:[{ name:filterByName, $and:[{email_id:filterByEmail,phone:filterByPhone}]}]}
   }
   else if(filterByName!=''&&filterByPhone!=''){
    filter={$and:[{name:filterByName,phone:filterByPhone}]}
  }
  else if(filterByEmail!=''&&filterByPhone!=''){
    filter={$and:[{email_id:filterByEmail,phone:filterByPhone}]}
  }
  else if(filterByName!=''&&filterByEmail!=''){
    filter={$and:[{email_id:filterByEmail,name:filterByName}]}
  }
  else if(filterByName!=''){
    filter={name:filterByName}
  }
  else if(filterByEmail!=''){
    filter={email_id:filterByEmail}
  }
  else if(filterByPhone!=''){
    filter={phone:filterByPhone}
  }
   let data=model.find(filter);
  data.exec((err,result)=>{
    if(err) throw err;
    res.render('index', { title: 'Employee Data',records:result });
  })
  
});

router.get('/edit/:id', function(req, res, next) {
  let id=req.params.id;
  let data=model.findById(id);
  data.exec((err,result)=>{
    if(err) throw err;
    res.render('edit', { title: 'Employee Data',record:result });
  })
  
});
router.post('/update', upload, function(req, res, next) {
  let id=req.body.id;
  let data=model.findByIdAndUpdate(id,{
    neme:req.body.name,
    address:req.body.address,
    email_id:req.body.email,
    phone:req.body.phone,
    image:req.file.filename,
  });
  console.log(data);
  data.exec((err)=>{
    if(err) throw err;
    res.redirect("/");
  })
  
});


router.get('/delete/:id', function(req, res, next) {
  let id=req.params.id;
  let del=model.findByIdAndDelete(id);
  del.exec((err)=>{
    if(err) throw err;
    res.redirect("/");
  });
  
});




module.exports = router;
