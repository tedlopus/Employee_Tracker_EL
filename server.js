const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

//Set PORT variable and call express so we use it
const PORT = process.env.PORT || 3001;
const app = express();
//boiler plate
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
  );








// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//listener for PORT / local host website
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });