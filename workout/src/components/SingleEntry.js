import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';

function Entry( { entry, onClickDelete, onEdit, row } ) {
  const date = new Date(entry.date);
  return (

    <tr className={ row % 2 === 0 ? "row1" : "row2"} >
      <td onClick={() => onEdit(entry)}>{ entry.name }</td>
      <td onClick={() => onEdit(entry)}>{ date.toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }</td>
      <td onClick={() => onEdit(entry)}>{ date.toLocaleString('en-us', { hour:"numeric", minute:"numeric" })  }</td>
      <td onClick={() => onEdit(entry)} align="right"> <span>Edit  </span><MdEdit  className="entry-buttons" /></td>
      <td onClick={() => onClickDelete(true, entry.id) } align="right"> <span>Delete  </span><MdDeleteForever  className="entry-buttons"/></td>
    </tr>
    
  );
}

export default Entry;