const express = require("express");
const app = express();
const ClockRoutes = require("./routes/Clock");
const cors =  require('cors');
PORT = process.env.PORT || 3001;

//parse routes to json object
app.use(express.json());
app.use(cors());
const db = require("./models");

//routes
app.use("/clock", ClockRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listen on port ${PORT}`));
});
