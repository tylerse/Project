import React from 'react';
import Entry from './SingleEntry';

function WorkoutList( { entries, onClickDelete, onEdit } ) {
  if(entries.length < 1){

    return (
      <div className="workout-list">      

          <center>
          <br/>
            <h2>
               You don't have any entries yet! 
               <br/>
               <br/>
               Click ADD NEW WORKOUT on the navigation bar to get started!
            </h2>
          </center>
      </div>
    )

  } else {

    return (    
      <div className="workout-list">      
        <center>
          <table>
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Edit Entry</th>
                <th>Delete Entry</th>
              </tr>          
            </thead>
            <tbody>
              {entries.map((entry, i) => 
                <Entry entry={ entry }
                  onClickDelete={ onClickDelete }
                  onEdit={ onEdit }
                  row = {i}
                  key={i}/>
                )
              }
            </tbody>      
          </table> 
        </center>       
      </div>
    );
  }
}

export default WorkoutList;