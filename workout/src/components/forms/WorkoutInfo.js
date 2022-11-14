import AddNewFooter from '../base/AddNewFooter.js';
import { useState, useEffect, useRef } from 'react';
import ExerciseForm from './ExerciseForm.js';
import SingleExercise from '../SingleExercise.js';

function WorkoutInfo({id}){

    const [edit, setEdit] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState();

    

    const loadEntries = async (id) => {
        const result = await fetch(`/exercises?WorkoutID=${id}`);
        try {
            const data = await result.json();
            setEntries(data);
        }
        catch (err) {
            throw err;
        }
        
    }

    const onDelete = async (id) => {
        const result = await fetch(`/exercise/${id}`,{
            method: "DELETE"
        })
        if (result.ok) {
            console.log("Deleted OK")
        }
    }

    const onEdit = (entry) => {
        setEntryData(entry);     
        setEdit(true)   
    }

    const update = async (obj) => {
        const result = await fetch('/exercise', {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        if(result.ok) {
            
            // Find where the object is in the array and update it
            const newArr = [...entries]            
            newArr[findIndex(obj, "id", newArr)] = obj
            setEntries(newArr)
            setEdit(false);
        }
    }

    // Finds an object's index in an array, params = the object, the string of the value to match, and the array to search.
    const findIndex = (obj, str, arr) => {
        for(let i = 0; arr.length; i++){
            if(arr[i][str] === obj[str])
                return i;
        }
        return -1;
    }

    const addNew = async (obj) => {
        const result = await fetch('/exercise', {
            method: "POST",
            body: JSON.stringify(obj)
        })
        if(result.ok) {
            setEntries([...entries, obj])
        }
    }

    useEffect(() => {
        loadEntries(id);
    }, [id]);


    if(entries.length < 1){
        return (
            <center><h2>No exercises were found for this workout!</h2><br/>
            <h5>Start adding exercises by clicking 'Add Exercise'!</h5></center>
        )
    }
    else {
        return (
            <>
            <div className="content">
            { edit ? <ExerciseForm data = { entryData }
                                    onEdit = {onEdit}
                                    cancel = {setEdit}
                                    addNew = { addNew }
                                    update = { update }
                                    />: null}
    
            <table>
                <thead>            
                    <tr>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Units</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Notes</th>
                        <th>Delete Entry</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, key) => {
                                return <SingleExercise  data = { entry }
                                                        onEdit = { onEdit }
                                                        delEntry = { onDelete }
                                                        row = { key } 
                                                        key = { key }/>
                            
                    })}                    
                        
                </tbody>
            </table>
            </div>
            <AddNewFooter text={"Add New Exercise..."}/>
            </>
        )
    }
    
}

export default WorkoutInfo;