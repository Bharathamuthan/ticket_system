 const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/user');
require('dotenv').config();
require('./config/db')

const app = express();
const PORT = process.env.PORT || 4000;
 
// if (process.env.NODE_ENV !== 'production') {
//   options.tlsAllowInvalidCertificates = true;
// }


app.use(bodyParser.json());

app.use('/api/users', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });