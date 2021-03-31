const mongoose = require("mongoose");
const { FALSE } = require("node-sass");
const Schema = mongoose.Schema;
const OderSchema = new Schema({
  _id: Number,
  date: String,
  driverId: Number,
  customerId: Number,
  idLoadingPoint: Number,
  idUnloadingPoint: Number,
  customerPrice: Number,
  driverPrice: Number,
  proxy: Boolean,
});
const DriverSchema = new Schema({
  _id: Number,
  value: String,
});
const CustomerSchema = new Schema({
  _id: Number,
  value: String,
});
const CitiesSchema = new Schema({
  _id: Number,
  value: String,
});

module.exports.taskGet = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  mongoose.connect("mongodb://localhost:27017/pet_proect", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  let data = {};
  const Driver = mongoose.model("Driver", DriverSchema);
  Driver.find({}, function (err, docs) {
    data.driverlist = docs;
  });
  const Customer = mongoose.model("Customer", CustomerSchema);
  Customer.find({}, function (err, docs) {
    data.clientList = docs;
  });
  const City = mongoose.model("Citie", CitiesSchema);
  City.find({}, function (err, docs) {
    data.citieslist = docs;
  });
  const Oder = mongoose.model("Oder", OderSchema);
  Oder.find({}).countDocuments(function (err, count) {
    console.log(count);
    Oder.find({}, function (err, docs) {
      mongoose.disconnect();
      if (err) return console.log(err);
      data.odersList = docs;
      res.json(data);
    })
      .skip(count - 5000)
      .limit(5000);
  });
};
