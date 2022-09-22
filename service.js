const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
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
    var checkExisting = await user.findOne({email: body.email});

    if(!checkExisting){
    const record = {
      email: body.email,
      password: body.password,
      age: body.age,
      imageurl: body.imageurl,
      name: body.name
    };
    res = await user.insertOne(record);
    console.log(res);
  }
  else{
    return 403;
  }
  } catch (e) {
    console.log(e);
  }

  return res;
}

exports.signIn = signIn;
exports.register = register;
