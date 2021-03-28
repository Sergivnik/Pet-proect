const mongoose = require("mongoose");
const { FALSE } = require("node-sass");
const Schema = mongoose.Schema;
const OderSchema = new Schema({
    _id: Number,
    date: Date,
    driverId: Number,
    customerId: Number,
    customerPrice: Number,
    driverPrice: Number,
    proxy: Boolean,
  });

module.exports.taskGet = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  mongoose.connect("mongodb://localhost:27017/pet_proect", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  
  const Oder = mongoose.model("Oder", OderSchema);
  //   const oder = new Oder({
  //     _id: 1,
  //     date: "2021-03-20",
  //     driverId: 35,
  //     customerId: 47,
  //     customerPrice: 9000,
  //     driverPrice: 8500,
  //     proxy: false,
  //   });
  //   oder.save(function (err) {
  //     if (err) return console.log(err);
  //     console.log("Сохранен объект", user);
  //   });
  Oder.find({}, function (err, docs) {
    mongoose.disconnect();

    if (err) return console.log(err);
    let data={};
    data.odersList = docs;
    res.json(data);
    console.log(docs);
  });
};
