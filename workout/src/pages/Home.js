import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';
import Dialog from '../components/base/dialog.js';
import Header from '../components/base/Header.js';
import NewWorkout from '../components/forms/NewWorkout.js';
import AddNewFooter from '../components/base/AddNewFooter.js';

function HomePage({ setEditEntry, success, update, reset }) {

  // states
  const [entries, setEntries] = useState([]);
  const [dialog, showDialog] = useState();
  const [toDelete, setRecordToDelete] = useState('');
  const [deleted, entryDelete] = useState();
  const [newWorkoutForm, setNewForm] = useState();

  const [newName, setNewName] = useState('New Workout')
  const [newDate, setNewDate] = useState(new Date())

  const history = useNavigate();  

  // craft and send request for delete to /workout/:id using delete
  const onDelete = async (id) => {
    onClickDelete(false, '');
    entryDelete(true);
    const response = await fetch(`/workout/${id}`, {
      method: 'DELETE'  
    });     
    // success, filter entry out of entries client-side so no new request needs to be sent 
    if (response.status === 204) {
      setEntries(entries.filter(entry => entry.id !== id))
    // fail, alert user
    } else {
      console.error(`Failed with status ${response.status} to delete entry ${id}`);
      alert("Could not delete the entry.  Please try again!");
    }
  };

  const submitNew = async () => {
    console.log(newName, newDate)
    let ndate = new Date(newDate).toISOString().slice(0, 19).replace('T', ' ');
    const data = {
        'name': newName,
        'date': ndate
    };
    const response = await fetch(`/new-workout`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(data)
    });
    loadEntries();
    setNewForm(false);
}

  // shows the deletion dialog when the user clicks the delete icon, and saves
  // the id of the record for if user clicks confirm deletion
  const onClickDelete = (visible, id) => {
   showDialog(visible);
   setRecordToDelete(id);
  };

  // sends the user to the edit form with info populated from entry
  const onEdit = async (entry) => {
    history(`/edit-workout/${entry.id}`);
  };

  // fetches the list of records from the server to a var for the entry table
  const loadEntries = async () => {
    
    const response = await fetch('/workouts');
    const data = await response.json();
    data.sort(function(a,b){
      return new Date(b.date) - new Date(a.date)
    })
    console.log(data)
    setEntries(data);
  }
  
  useEffect(() => {
    setNewForm(false);
  }, []);

  // loads the entries on mount only
  useEffect(() => {
    loadEntries();
    setNewDate(Date.now())
  }, []); 

  // resets the success popup var so it will not trigger on updates
  useEffect(() => {
    if(success)
      reset();
      
  },[]); //eslint-disable-line react-hooks/exhaustive-deps

  // resets the update popup var so it will not trigger on updates
  useEffect(() => {
    if(update)
      reset(); 
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // creates a timer that turns off the deletion success msg so it does not retrigger
  useEffect(() => {
    const timeout = () => setTimeout(function(){
      entryDelete(false);
    }, 2000);   
    const timerID = timeout();
    return ()=> {
      clearTimeout(timerID);
    }
  }, [deleted]);

  return (
    <>
      < Header newForm={ setNewForm }/>      
      <div className="main">
        { success ? <div className="text-popup">Nice work!</div> : null }
        { update ? <div className="text-popup">Entry updated!</div> : null } 
        { deleted ? <div className="text-popup">Entry deleted!</div> : null }
        { dialog ? <Dialog cancel={ onClickDelete } confirm={ onDelete } _id= { toDelete }/> : null}
        { newWorkoutForm ? <NewWorkout newName={newName} newDate={newDate} setNewName={setNewName} setNewDate={setNewDate} setNewForm={setNewForm} submitNew={submitNew}/> : null}
        <WorkoutList  entries={ entries } onClickDelete={ onClickDelete } onEdit={ onEdit }/>             
      </div>    
      <AddNewFooter text={"Add New Workout..."}/>  
    </>
  );
}

export default HomePage;