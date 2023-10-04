import mysql from "mysql";


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "you password",
    database: "books",
  });
  
  db.connect((err) => {
    if (err) {
      console.log('Error connecting to Database', err);
      return;
    }
    console.log('Connection established');
  });

  export default db  