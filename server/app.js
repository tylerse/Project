import express from 'express'
import * as microservice from './Microservice.js'

import { GetAllWorkouts, GetWorkout, UpdateWorkout, NewWorkout } from './SqlHandler.js'

const app = express() 
const port = 8000

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}));

app.get('/workouts', async (req, res) => {
  const result = await GetAllWorkouts()
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
  const response = await NewWorkout(data)
  res.send(response);
})

app.get('/workout/:id', async (req, res) => {
  console.log("Received request for workout details")
  const workout = await GetWorkout(req.params.id)
  res.send(workout) 
});

app.post('/workout/:id', async (req, res) => { 
  console.log("Received workout post request.")
  console.log(req.body)

  let data = {
    'name': req.body.name,
    'date': req.body.date
  }
  const response = await UpdateWorkout(req.params.id, data)
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Workout app listening on port ${port}`)
})

microservice.listen();