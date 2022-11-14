import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {Date} from 'react-datepicker';

export default function NewWorkout({newName, newDate, setNewName, setNewDate, setNewForm, submitNew}) {


    return (
        <div className="confirm-overlay">
            <div className="new-workout">
                <h2>New Workout Details</h2>
                <input type="text" defaultValue={newName} onChange={e => setNewName(e.target.value)}/>
                <DatePicker
                    selected={newDate}
                    onChange={setNewDate}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <br />
                <button className="confirm" onClick={submitNew}>Save Workout</button>
                <button className="cancel" onClick={() => setNewForm(false)}>Cancel</button>
            </div>
        </div>
    )
}