import { useEffect, useState } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import WorkoutHeader from '../components/base/WorkoutHeader';
import WorkoutInfo from '../components/forms/WorkoutInfo';
import parseISO from 'date-fns/parseISO';


function Edit(){

    let navigate = useNavigate();
    let { id } = useParams();

    const [isLoaded, setLoaded] = useState(false);
    const [name, setName] = useState();
    const [date, setDate] = useState();

    const loadEntry = async (id) => {
        const response = await fetch(`/workout/${id}`);
        const data = await response.json();
        setName(data[0].name);
        setDate(parseISO(data[0].date));
        setLoaded(true);
      }

    

    const submitChanges = async () => {
        let ndate = date.toISOString().slice(0, 19).replace('T', ' ');
        const data = {
            'name': name,
            'date': ndate
        };
        const response = await fetch(`/workout/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify(data)
        });
        navigate('/');
    }
    
    useEffect(() => {
        loadEntry(id);
    }, []);

    return (
        <>
            { isLoaded ? 
                 < WorkoutHeader name={name} date={date} setDate={setDate} setName={setName} submit={submitChanges}/>  :
                 <h2>Loading...</h2>               
            }
            {
                isLoaded ? 
                < WorkoutInfo data={ {'id': id} }/> :
                <h2>...</h2>
            }
            
        </>        
    )

    
}   

export default Edit;