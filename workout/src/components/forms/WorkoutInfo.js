import AddNewFooter from '../base/AddNewFooter.js';

function WorkoutInfo({ data }){

    const loadEntries = async (id) => {
        const result = await fetch(`/exercises/${id}`);
    }
    return (
        <>
        <div className="content">
            <h2>{ data.name }</h2>
            
        </div>
        <AddNewFooter text={"Add New Exercise..."}/>
        </>
    )
}

export default WorkoutInfo;