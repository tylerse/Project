import { useState } from 'react';

export default function SingleExercise ({data, row, onEdit, delEntry}) {

    const [weight, setWeight] = useState(data !== undefined ? data.weight : null);

    const onDelete = (id) => {
        delEntry(id)
    }

    const RequestConvert = async (weight, unit) => {
        const response = await fetch(`/convert?weight=${weight}&unit=${unit}`)
        if(response.ok){
            
            let newWeight = await response.json()
            newWeight = Math.round(newWeight);
            console.log((newWeight))
            setWeight(newWeight);
        }
    }

    return (            
            <tr className = { row % 2 === 0 ? "row1": "row2" } >
                <td onClick={() => onEdit(data)}> {data.description} </td>
                <td> {weight} </td>
                <td><select onChange={(e) => RequestConvert(weight, e.target.value)}>
                        <option value = "lbs">lbs</option>
                        <option value = "kgs">kgs</option>
                    </select></td>
                <td> {data.sets} </td>
                <td> {data.repetitions} </td>
                <td> {data.notes} </td>
                <td className = "delete" onClick={() => onDelete(data.id)}> DELETE </td>
            </tr>       
    )
}