import express from 'express'
import * as microservice from './Microservice.js'

import * as sql from './SqlHandler.js'
import * as fs from 'fs';

const app = express() 
const port = 8000

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}));

const filename = "./microservice/unit_convert_service.txt"

app.get('/workouts', async (req, res) => {
  const result = await sql.GetAllWorkouts()
  res.send(result);
});

app.delete('/workout/:id', async (req, res) => {
  console.log("Received request to delete workout")
  console.log(req.params.id)
  res.sendStatus(204)
  //DeleteWorkout(req.body.id)
});

app.post('/new-workout', async (req, res) => {
  console.log("Received new workout post")
  let data = {
    'name': req.body.name,
    'date': req.body.date
  }
  console.log(data)
  const response = await sql.NewWorkout(data)
  res.send(response);
})

app.get('/workout/:id', async (req, res) => {
  console.log("Received request for workout details")
  const workout = await sql.GetWorkout(req.params.id)
  res.send(workout) 
});

app.post('/workout/:id', async (req, res) => { 
  console.log("Received workout post request.")
  console.log(req.body)

  let data = {
    'name': req.body.name,
    'date': req.body.date
  }
  const response = await sql.UpdateWorkout(req.params.id, data)
  res.sendStatus(204);
});


app.get('/exercises', async (req, res) => {
  const w_id = req.query.WorkoutID;
  console.log(`Received request for workout ${w_id} exercises`)
  const data = await sql.GetExercisesByWorkout(w_id)
  res.send(data) 
});

app.put('/exercise', async (req, res) => {
  const obj = {
    id: req.body.id,
    description: req.body.description,
    sets: req.body.sets,
    weight: req.body.weight,
    repetitions: req.body.repetitions,
    notes: req.body.notes
  }
  console.log(`Received update request for exercise ${obj.id}`)
  const data = await sql.UpdateExercise(obj);
  res.send(data) 
});

app.delete('/exercise/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Received request to delete exercise ${id}`)
  const result = await sql.DeleteExercise(id);
  res.send(result);
});


app.get('/convert', async (req, res) => {
  
  const weight = req.query.weight;
  const unit = req.query.unit;        

    const fdata = `['${weight}', '${unit}']`
    fs.writeFile(filename, fdata, function(err) {
        if (err) throw err;
        console.log('Write OK: ' + filename);        
      });
    const result = await ReadConvert();
    res.send(result);    
})

const ReadConvert = async () => {
  let converted = false;

  let result = '';
  while(!converted){
    await sleep(1000)
    fs.readFile(filename, 'utf8', function(err, fdata) {
      if (err) throw err;
      if(fdata[0] !== "[")
      converted = true;
      result = fdata;
    });
    
  }
  console.log(result);
  return result;
  
  
}

async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}


app.listen(port, () => {
  console.log(`Workout app listening on port ${port}`)
})

microservice.listen();