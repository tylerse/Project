import { useState } from 'react';

export default function ExerciseForm({ data, addNew, update, cancel }){

    console.log(data)
    const [desc, setDesc] = useState(data === undefined ? '' : data.description);
    const [sets, setSets] = useState(data === undefined ? 0 : data.sets);
    const [weight, setWeight] = useState(data === undefined ? 0 : data.weight);
    const [reps, setReps] = useState(data === undefined ? 0 : data.repetitions);
    const [notes, setNotes] = useState(data === undefined ? '' : data.notes);

    const constObj = () => {
        const exercise = {
            id: data.id,
            description: desc,
            sets: sets,
            weight: weight,
            repetitions: reps,
            notes: notes
        }
        return exercise;
    }

    return (
        <div className = "fixed-overlay">
            <label>Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <label>Sets</label>
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            <label>Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <label>Repetitions</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <label>Notes</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

        {data === undefined ? 
        <button onClick={() => addNew(constObj())}>Submit</button> : 
        <button onClick={() => update(constObj())}>Update</button>
        }
            <button onClick={() => cancel()}>Cancel</button>
        </div>
    )
}   