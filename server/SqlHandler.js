import crypto from 'crypto'
import mysql2 from 'mysql2/promise'

let pwd = 'Hulahoops55!'
var hash = crypto.createHash('sha256').update(pwd).digest('base64');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hulahoops55!',
    database: 'cs_361',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z'
    });

export async function GetAllWorkouts() {
    try {
        const query = 'SELECT * FROM workout'
        const result = await pool.query(query)
        return result[0];
    }
    catch (err) {
        console.log(err)
    }    
};

export async function GetWorkout(id){
    try {
        const query = 'SELECT * FROM workout WHERE id= ?'
        const result = await pool.query(query, id)
        return result[0];
    }
    catch (err) {
        console.log(err)
    }  
}

export async function UpdateWorkout(id, data){
    try {
        const query =  `UPDATE workout SET name= ?, date= ? WHERE id= ?;`
        const result = await pool.query(query, [data.name, data.date, id])
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

export async function NewWorkout(data){
    try {
        const query = `INSERT INTO workout (name, date) VALUES (?, ?);`
        const result = await pool.query(query, [data.name, data.date])
        return result.insertId;
    }
    catch{
        console.log(err);
    }

}