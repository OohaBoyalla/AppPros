const { MongoClient } = require("mongodb");
var nodemailer = require("nodemailer");

const uri =
  "mongodb+srv://muzztafa:assignment123@cluster0.i3wv9lq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("assignment1");
const user = database.collection("user");

async function signIn(email, password) {
  var res;
  try {
    const query = { email: email, password: password };
    res = await user.findOne(query);
    console.log(res);
  } catch (e) {
    console.log(e);
  }

  return res;
}

async function register(body) {
  var res;
  try {
    //check if user with same email already exists
    var checkExisting = await user.findOne({ email: body.email });

    if (!checkExisting) {
      const record = {
        email: body.email,
        password: body.password,
        age: body.age,
        imageurl: body.imageurl,
        name: body.name,
      };
      res = await user.insertOne(record);
      console.log(res);
    } else {
      return 403;
    }
  } catch (e) {
    console.log(e);
  }

  return res;
}

async function update(body) {
  var res;
  try {
    const email = req.body.email;
    if (email && email === "") {
      return 403;
    } else {
      res = await Collection.updateOne({ email: email }, req.body);
    }
  } catch (e) {
    console.log(e);
  }

  return res;
}

async function deleteUser(body) {
  var res;
  try {
    const email = req.body.email;
    if (email && email === "") {
      return 403;
    } else {
      res = await Collection.deleteOne({ email: email });
    }
  } catch (e) {
    console.log(e);
  }

  return res;
}

async function sendEmail(email) {
  var checkExisting = await user.findOne({ email: email });
  //return if no user exists
  if (!checkExisting) {
    return 403;
  }

  //create a random string
  let r = (Math.random() + 1).toString(36).substring(7);

  //send an email

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "internshipassignment1@gmail.com",
      pass: "opajfnrrkrhgvlwh",
    },
  });

  var mailOptions = {
    from: "internshipassignment1@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: "Your reset code is: " + r,
  };

  res = await user.updateOne({ email: email }, { $set: { resetLink: r } });
  let info = await transporter.sendMail(
    mailOptions
    //   function (error, info) {
    //   if (error) {
    //     console.log(error);
    //     return 400;
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     return 200;
    //   }
    // }
  );
  console.log("info: " + info);
  return 200;
}

async function resetPassword(body) {
  try {
    var email = body.email;
    var resetCode = body.resetLink;
    var newPassword = body.newPassword;
    var checkExisting = await user.findOne({ email: email });

    if (!checkExisting && !checkExisting.resetLink) {
      return 403;
    } else if (checkExisting.resetLink != resetCode) {
      return 404;
    } else {
      res = await user.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
      return 200;
    }
  } catch (e) {
    console.log(e);
  }
}

exports.signIn = signIn;
exports.register = register;
exports.update = update;
exports.deleteUser = deleteUser;
exports.sendEmail = sendEmail;
exports.resetPassword = resetPassword;
