const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const hrRoutes = require('./routes/hrRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3001;

app.use('/hr', hrRoutes);
app.use('/manager', managerRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));