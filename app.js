const express = require('express');
// const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
require('./controller')(app);




    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})