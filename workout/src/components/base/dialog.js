import React from 'react';

function Dialog( { cancel, confirm, _id }) {

    return (
        <div className="confirm-overlay" onClick={ () => cancel(false, _id) }>
            <div className="confirm-dialog">
                <div>
                    <h1 style={{color:"#6990d3"}}>Are you sure you want to delete this record?</h1>
                    <p>This action will permanently delete this entry.<br/><br/>
                        Are you sure you wish to perform this action?</p><br/>
                </div>
                <div>
                    <div className="cancel" 
                        tabIndex="0"
                        onClick={ () => cancel(false, _id) }>
                        Cancel
                    </div>
                    <div className="confirm" 
                        tabIndex="0"
                        onClick={ () => confirm( _id ) }>
                        Confirm
                    </div>
                    <br/>
                </div>
            </div>         
        </div>        
    )       
}

export default Dialog;