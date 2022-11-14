export default function ConfirmationDialog({confirm, cancel}){
    return (
        <div className = "fixed-overlay">
            <div>
                <h2> Are you sure you wish to delete this entry? </h2>
                <h5> This action cannot be undone! </h5>
            </div>
            <div>
                <button onClick={() => confirm()}>Delete</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    )
}