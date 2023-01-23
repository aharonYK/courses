const express = require("express");
const cors = require("cors");
const routs = require("./routs");
const app = express();
const auth = require('./middlewares/auth');

const port = 3200;
app.use(express.json());
app.use(cors());

//app.use('/api/courses/MyCourses', auth);
app.use("/api/courses", routs);



app.listen(port, () => `active on port: ${port}`);