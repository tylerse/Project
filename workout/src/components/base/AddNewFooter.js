export default function AddNewFooter({text, saveChanges}){
    return (
        <div className="footer" onClick={e => saveChanges()}>
            <h2>{text}</h2>
        </div>
    )
}