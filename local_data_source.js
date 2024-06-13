const express = require(`express`);
const local = express.Router();





// MySQL
const mysql = require(`mysql`);
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'pma',
    // password: '',
    database: 'meal_planner'
});

// Define the SQL statement to create a table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    recipeId INT NOT NULL,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Execute the SQL query to create the table
pool.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Error creating table:', error);
    return;
  }
  console.log('Table created successfully:', results);
});

// Body-Parser
local.use(express.json());

// Insert History
local.post(`/insert-history`, (req, res) => {
    const {
        id,
        title        
    } = req.body
    pool.query(`INSERT INTO history SET ?`, {
        title: title,
        recipeId: id 
    }, (error, results, fields) => {
        if(error) {
          console.log(`Error When Inserting - ${error.message}`)
            return res.status(error.code).send(error.message);
        }
        console.log(`Inserted Row with ID - ${id}`);
        return res.send(`Data Inserted`);
    });
});



module.exports = local;
