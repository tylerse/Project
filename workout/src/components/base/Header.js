function Header({ newForm }){
    return (
        <div className="header">
            <div className="left">
                <h2></h2>
            </div>
            <div className="center">
                <h2>Workout Dashboard</h2>
            </div>
            <div className="right">
                <button onClick={() => newForm(true)} className="new-button">Add New Workout</button>
            </div>
        </div>
    )
}

export default Header;