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
      var update = await service.update(req.body );
      console.log("UPDATE");
    console.log(update);

    if (update == 403) {
      res.send(403, "Email not found");
    }
    else if (update.modifiedCount > 0) {
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
      var deleteUser = await service.deleteUser(req.body.email );
      console.log("DELETE");
    console.log(deleteUser);

    if(deleteUser == null){
      res.send(404, "Email not found");
    }
    if (deleteUser.deletedCount == 0) {
      res.send(403, "Email not found");
    }
    else if (deleteUser.deletedCount > 0) {
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

  app.post("/sendEmail", async (req, res) => {
    try {
      var emailSent = await service.sendEmail(req.body.email);
      console.log("EMAIL SENT: "+emailSent);
      if(emailSent == 200){
        res.send(200, "Reset email sent successfully");
      }
      else if (emailSent == 403){
        res.send(403, "No account with this email exists.");
      }
      else{
        res.send(400, "Something went wrong.");
      }

    } catch (e) {
      console.log("Error in Sending Email :", e);
      res.send(400, "Error in Sending Email.");
    }
  }
  
  );

  app.post("/resetPassword", async (req, res) => {
    try {
      var resetPassword = await service.resetPassword(req.body);

      if(resetPassword == 200){
        res.send(200, "Password reset successfully");
      }
      else if (resetPassword == 403){
        res.send(403, "User doesnt exist or reset link doesnt exist");
      }
      else{
        res.send(400, "Reset code doesnt match");
      }

    } catch (e) {
      console.log("Error in Sending Email :", e);
      res.send(400, "Error in Sending Email.");
    }
  }
  
  );
};