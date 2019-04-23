const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const User = require("./user");
const { ObjectId } = require("mongodb");
const mongodb = require("mongodb");
const sha256 = require("js-sha256").sha256;
const nodemailer = require("nodemailer");
const API_PORT = 3001;
const app = express();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "platformtest147@gmail.com",
    pass: "CSE442@platformmail"
  }
});

//setup whitelist for http request
//When upoad to server, make sure this is live and prevent un indentify request
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5555",
  "http://www.matpan.com/UBPlatform",
  "https://www.matpan.com/UBPlatform"
];
var corsOptions = {
  origin: function(origin, callback) {
    if (origin == undefined || whitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb://ubplatform:19981002@cluster0-shard-00-00-oxrms.mongodb.net:27017,cluster0-shard-00-01-oxrms.mongodb.net:27017,cluster0-shard-00-02-oxrms.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//this method overwrites existing data in our database
router.post("/updateByIdData", (req, res) => {
  Data.findByIdAndUpdate(req.body.id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//this method removes existing data in our database
router.delete("/deleteByIdData", (req, res) => {
  Data.findByIdAndDelete(req.body.id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  }).setOptions({ single: true });
});

// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();
  const { title, price, course, url, owner } = req.body;
  data.title = title;
  data.price = price;
  data.course = course;
  data.owner = owner;
  data.url = url;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/isUserExist", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.json({ error: err });
    if (user != null) return res.json({ message: "User Already Exist." });
    return res.json({ message: "User don't exist." });
  });
});

//test
// this method adds new data in our database
router.post("/putUser", (req, res) => {
  User.findOne({ username: req.body.username }, (err, users) => {
    if (err) return res.json({ success: false, error: err });
    if (users != null)
      return res.json({ success: false, message: "User already exist" });

    let user = new User();
    const { username, email, password, firstname, lastname } = req.body;
    user.username = username;
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    var salt =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    user.salt = salt;
    user.password = passwordHashing(password, salt);
    user.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, message: "User Register" });
    });
  });
});

router.post("/unregister", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    if (user == null)
      return res.json({ success: false, message: "user not found." });
    if (user.password == passwordHashing(req.body.password, user.salt)) {
      User.findOneAndDelete({
        username: user.username,
        password: user.password
      });
      Data.deleteMany({ owner: user.username }, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) return res.json({ success: false, error: err });
    if (user == null)
      return res.json({
        success: false,
        message: "Username or Password is incorrect."
      });
    if (user.password == passwordHashing(req.body.password, user.salt)) {
      return res.json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          interestsList: user.interestsList
        }
      });
    } else return res.json({ success: false, message: "Incorrect Password!" });
  });
});

router.post("/changePassword", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    if (user == null)
      return res.json({ success: false, message: "User don't exist." });
    if (user.password == passwordHashing(req.body.password, user.salt)) {
      var salt =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      var password = passwordHashing(req.body.newPassword, salt);
      User.findOneAndUpdate(
        { username: user.username, password: user.password },
        { password: password, salt: salt },
        err => {
          if (err) return res.json({ success: false, error: err });
          return res.json({ success: true });
        }
      );
    } else {
      return res.json({ success: false, message: "Incorrect Password!" });
    }
  });
});

router.post("/forgetPassword", (req, res) => {
  User.findOne(
    { username: req.body.username, email: req.body.email },
    (err, user) => {
      if (err) return res.json({ success: false, error: err });
      if (user == null)
        return res.json({ success: false, message: "User don't exist." });
      var salt =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      var password =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      User.findOneAndUpdate(
        { username: user.username, password: user.password },
        { password: passwordHashing(password, salt), salt: salt },
        err => {
          if (err) return res.json({ success: false, error: err });
          mail = {
            from: "platformtest147@gmail.com",
            to: user.email,
            subject: "Reset Password from UBPlatform.",
            text:
              "Here is your new password:\n" +
              password +
              "\n" +
              "Please change your password under Account Page as soon as possible. \n\n UBPlatform"
          };
          transporter.sendMail(mail);
          return res.json({ success: true });
        }
      );
    }
  );
});

router.post("/search", (req, res) => {
  Data.find(req.body, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/guessYouLike", (req, res) => {
  Data.find(req.body, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    let random = Math.floor(Math.random() * Math.floor(3));
    console.log("all books: " + data[random]._id);
    return res.json({ success: true, data: data[random] });
  });
});

//put interests in a user
router.post("/putInterests", (req, res) => {
  User.findOne({ username: req.body.username }, (err, users) => {
    if (err) return res.json({ success: false, error: err });

    if (users.interestsList.includes(req.body.course)) {
      console.log("found tha english already added!!!!!!!!");
      return res.json({ success: false, message: "Interests already exist" });
    }
    users.interestsList.push(req.body.course);
    users.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, message: "Interests added" });
    });
  });
});

//get user's interests list
router.post("/getInterests", (req, res) => {
  User.findOne({ username: req.body.username }, (err, users) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: users.interestsList });
  });
});

router.post("/report", (req, res)=>{
  console.log(req.body);
  var reqB = req.body;
  if(reqB.seller && reqB.email && reqB.book && reqB.reason){
    mail = {
      from: "platformtest147@gmail.com",
      to: "platformtest147@gmail.com",
      subject: "!Report!",
      text:
        "Seller:\n" +
        reqB.seller +
        "\n" +
        "Email:\n" +
        reqB.email +
        "\n" +
        "Book:\n" +
        reqB.book +
        "\n" +
        "Reason:\n" +
        reqB.reason +
        "\n"
    };
    transporter.sendMail(mail);
    return res.json({success: true});
  }
  else{
    return res.json({success: false, message: "You need to fill up the require fields."});
  }
});

passwordHashing = (password, salt) => {
  return sha256(password + salt);
}

exports.passwordHashing = (password, salt) => {
  return sha256(password + salt);
}

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
