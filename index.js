const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/harrykart', {useNewUrlParser: true, //database name should be specified
useUnifiedTopology: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  //console.log("we are connected.YaY!!");
});
//preparing a schema for the respective data which is going to enter into mongodb
//specifies the type of data to be entered into mongodb and ueful for making some restrictions
var kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  var greeting ="my name is "+ this.name
  console.log(greeting);
}

//locking the schema 
//converting a schema into a model .note that a model cannot be modified as it locks the schema
var harrykitty = mongoose.model('Kitten', kittySchema);//the 1st parameter describes the collection name and stores it in a plural form.
//using the model
var kitten1 = new harrykitty({ name: 'harrykittyname1' });
console.log(kitten1.name); 
kitten1.speak();
//saving into the document
kitten1.save(function (err, kitten1) {
  if (err) return console.error(err);
  kitten1.speak();
})
var kitten2 = new harrykitty({ name: 'harrykittyname2' });
kitten2.save(function (err, kitten2) {
  if (err) return console.error(err);
  kitten2.speak();
})

//
harrykitty.find({name:'harrykittyname1'},function (err, kittens) {//filter object must be specified as parameter
  if (err) return console.error(err);
  console.log(kittens);
})

