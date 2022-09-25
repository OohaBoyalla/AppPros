const service = require("./service");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded());
  app.get("/", async (req, res) => {
    res.send("Hello!");
  });

  app.post("/login", async (req, res) => {
    var user = await service.signIn(req.body.email, req.body.password);

    if (user) {
      res.send(user);
    } else {
      res.send(401, "Wrong username or password");
    }
  });

  app.post("/register", async (req, res) => {
    var register = await service.register(req.body);
    console.log("REGISTER");
    console.log(register);

    if (register == 403) {
      res.send(403, "Email already in use");
    }
    else if (register.insertedId != null) {
      res.send("User registered successfully");
    }
    else {
      res.send(403, "Failure");
    }
  });

  app.put("/update", async (req, res) => {
    try {
      var update = await Services.update(req.body.email );
      console.log("UPDATE");
    console.log(update);

    if (update == 403) {
      res.send(403, "Email not found");
    }
    else if (update.insertedId != null) {
      res.send("User updated successfully");
    }
    else {
      res.send(403, "Failure");
    }

    } catch (e) {
      console.log("Error in profileUpdate :", e);
      return new Error(e);
    }
  });

  app.put("/deleteUser", async (req, res) => {
    try {
      var deleteUser = await Services.deleteUser(req.body.email );
      console.log("DELETE");
    console.log(deleteUser);

    if (update == 403) {
      res.send(403, "Email not found");
    }
    else if (deleteUser.insertedId != null) {
      res.send("User delete successfully");
    }
    else {
      res.send(403, "Failure");
    }

    } catch (e) {
      console.log("Error in Delete User :", e);
      return new Error(e);
    }
  });
};
