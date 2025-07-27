require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { checkConnection } = require('./elasticClient');

const app = express();
app.use(bodyParser.json());

checkConnection();
app.use('/api/articles', require('./routes/articles'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
