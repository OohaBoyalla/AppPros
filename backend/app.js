const express = require('express');

// const { default: mongoose } = require('mongoose');
const app = express();
const port = 6965;
require('./controller')(app);


const cors= require("cors");
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})