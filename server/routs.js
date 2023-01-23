const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./model/db");
const _ = require("lodash");


//GET E-MAIL
router.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const users = await db.query(
      `select * from users WHERE email = '${email}'`
    );
    res.send(users.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//GET BY ID
router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.send(users.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//GET ALL COURSES FOR USER
router.get("/:id", async (req, res) => {
  try {
    const id = [req.params.id];
    const sqlQuey = `select * from courses where user_id=$1` 
    const user = await db.query(sqlQuey,id);
    res.send(user.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//LOGIN
router.post('/auth', async (req, res) => {
    // Get the user's email and password from the request body
    const { email, password } = req.body;
  
    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await db.query(query, values);
    if (!rows[0]) return res.status(401).send('Invalid email or password');
  
    // Compare the hashed password
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) return res.status(401).send('Invalid email or password');
  
    // Generate a JWT token
    const payload = { userId: rows[0].id };
    const secret = 'thisString';
    const token = jwt.sign(payload, secret);
    // Send the token to the client
    res.header('x-auth-token', token)
    .header("access-control-expose-header","x-auth-token")
    .send(token);
    
  });
  

//ADD NEW USER
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    const existingUser = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    if (existingUser.rows.length != 0) {
      res.status(409).json({
        error: "Email already in use",
      });
      return;
    } else {
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
      const result = await db.query(
        `INSERT INTO users (email, password,username) VALUES ('${email}', '${hashedPassword}','${username}')`
      );

      const user = await db.query(
        `SELECT * FROM users WHERE email = '${email}'`
      );
      res.send(user.rows);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Add  COURS TO USER
router.post("/AddTo", async (req, res) => {
  try {
    const { subject, id } = req.body;
   // locate the subject id from the subject table
    // const decoded = jwt.verify(token, "secret_key");
    // if (decoded.id !== parseInt(id)) {
    //   res.status(401).json({ error: "Unauthorized" });
    //   return;
    // }
    const sub = await db.query(
      `SELECT id FROM subjects WHERE subject = '${subject}'`
    );
    if (sub.rows.length == 0) {
      res.status(404).json({
        error: "Subject not found",
      });
      return;
    }
    const exsit = await db.query(
      `SELECT * FROM courses WHERE subject_id = '${sub.rows[0].id}' AND user_id =${id} `
    );
    if (exsit.rowCount > 0) {
      res.status(404).json({
        error: "Alredy regingth",
      });
      return;
    }
    // check if there are already 22 students in the same course
    const NumOfStusents = await db.query(
      `SELECT COUNT(*) FROM courses WHERE subject_id = ${sub.rows[0].id}`
    );
    

    if (NumOfStusents.rows[0].count % 22 == 0) {
      // create a new course with a new name and a new id
      const newCourseId =Math.floor( NumOfStusents.rows[0].count / 22) + 1;
      
      const newCourseName = `${subject} ${newCourseId}`;
      await db.query(
        `INSERT INTO courses ( subject_id, name, user_id) VALUES ( ${sub.rows[0].id}, '${newCourseName}', '${id}')`
      );
     return res.status(200)
    } else {
      // add the user to an existing course
      
     const Num= await db.query(
        `SELECT name, COUNT(user_id) as user_count FROM courses WHERE subject_id = ${sub.rows[0].id} GROUP BY name`
      );
      let x=null

x=(Num.rowCount);
for(i=0;i<Num.rowCount;i++){
    if(Num.rows[i].user_count<2){
        x=Num.rows[i].name
}
}     
      const newCourseName = x;
      await db.query(
        `INSERT INTO courses ( subject_id, name, user_id) VALUES ( ${sub.rows[0].id}, '${newCourseName}', '${id}')`
      );
    return res.status(200)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//REMOVE FROM COURS
router.delete("/:id/:user_id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { id, user_id } = req.params;
   // decode and verify token
    //const decoded = jwt.verify(token, "secret_key");

    // if (decoded.user_id !== parseInt(user_id)) {
    //   res.status(401).json({ error: "Unauthorized" });
    //   return;
    // }
    //remove the user from the course
    await db.query(
      `DELETE FROM courses WHERE id = ${id} AND user_id = ${user_id}`
    );
    res.json({
      message: "User removed from course",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
