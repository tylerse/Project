import { Link } from 'react-router-dom';
import DatePicker, {Date} from 'react-datepicker';
import parseISO from 'date-fns/parseISO';
import "react-datepicker/dist/react-datepicker.css";

function WorkoutHeader({ name, date, setName, setDate, submit }){

    return (
        <div className="header">
            <div className="left">
                <Link to="/"><h2>← Home</h2></Link>
            </div>
            <div className="center">
                <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} className="big-input"></input><br/>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </div>
            <div className="right">
                <button className="confirm" onClick={submit}>Save Changes</button>
                <button className="new-button" onClick={submit}>Add New Exercise</button>
            </div>
        </div>
    )
}

export default WorkoutHeader;