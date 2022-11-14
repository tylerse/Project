import { useEffect, useState } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import WorkoutHeader from '../components/base/WorkoutHeader';
import WorkoutInfo from '../components/forms/WorkoutInfo';
import parseISO from 'date-fns/parseISO';


function Edit(){

    let navigate = useNavigate();

    const [name, setName] = useState();
    const [date, setDate] = useState();    

    const submitChanges = async () => {
        console.log(name)
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
                 < WorkoutHeader name={"Workout Name"} date={Date.now()} setDate={setDate} setName={setName} submit={submitChanges}/>  :
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