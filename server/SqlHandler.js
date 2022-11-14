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
        const query = 'SELECT * FROM workouts'
        const result = await pool.query(query)
        return result[0];
    }
    catch (err) {
        console.log(err)
    }    
};

export async function GetWorkout(id){
    try {
        const query = 'SELECT * FROM workouts WHERE id= ?'
        const result = await pool.query(query, id)
        return result[0];
    }
    catch (err) {
        console.log(err)
    }  
}

export async function GetExercisesByWorkout(id){
    try {
        const query = 'SELECT * FROM exercises WHERE workout_id= ?'
        const result = await pool.query(query, [id])
        return result[0];
    }
    catch (err) {
        console.log(err)
    }  
}

export async function UpdateWorkout(id, data){
    try {
        const query =  `UPDATE workouts SET name= ?, date= ? WHERE id= ?;`
        const result = await pool.query(query, [data.name, data.date, id])
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

export async function NewWorkout(data){
    try {
        const query = `INSERT INTO workouts (name, date) VALUES (?, ?);`
        const result = await pool.query(query, [data.name, data.date])
        return result.insertId;
    }
    catch (err) {
        console.log(err);
    }

}

export async function UpdateExercise(data){
    try {
        const query = `UPDATE exercises
                        SET description = ?, sets = ?, weight = ?, repetitions = ?, notes = ?
                        WHERE id= ?;`
        const result = await pool.query(query, [                        
                        data.description,
                        data.sets,  
                        data.weight,                        
                        data.repetitions,
                        data.notes,
                        data.id
                    ])
        return result;
    }
    catch (err) {
        console.log(err);
    }

}

export async function DeleteExercise(id){
    try {
        const query = `DELETE FROM exercises WHERE id= ?`
        const result = await pool.query(query, [id])
        return result;
    }
    catch (err){
        console.log(err);
    }

}
