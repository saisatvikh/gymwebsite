const { urlencoded } = require("express");
const express=require("express");
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const port=80;
const fs=require('fs');
const { stringify } = require("querystring");

mongoose.connect('mongodb://localhost/aboutusingym', {useNewUrlParser: true, //database name should be specified
useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected.YaY!!");
});
var abtus = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    address: String,
    info: String
  });

abtus.methods.speak = function () {
    var greeting ="my name is "+ this.name
    console.log(greeting);
  }
  var aboutus = mongoose.model('aboutusinfo',abtus);  


app.use('/static',express.static('static'));
app.use(urlencoded());


app.set('view-engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/about',(req,res)=>{
    const title="this is my first website";
    const content='hi,hello ,this is sai';
    const params={'title':title,'content':content};

    res.status(200).render('about.pug',params);
})
app.get('/classes',(req,res)=>{
    res.status(200).render('classes.pug');
})
app.get('/schedules',(req,res)=>{
    res.status(200).render('schedules.pug');
})
app.post('/aboutus',(req,res)=>{
   /*console.log(req.body);  
   const message="your data has been submitted";
   const params={
       msg:message
   };
   let str=`name: ${req.body.name}`+"\n"+`gender: ${req.body.gender}`+"\n"+`age: ${req.body.age}`+"\n"+`address: ${req.body.address}`+"\n"+`info: ${req.body.info}`
   res.status(200).render('index.pug',params);
   fs.writeFileSync('output.txt',str);*/
   var about=new aboutus(req.body);
   about.save(function (err,about) {
    if (err) return console.error(err);
    about.speak();
  })
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})