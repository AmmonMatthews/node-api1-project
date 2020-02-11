import React, { useReducer } from 'react';


export default function UserCard ({ users }) {

    return(
        <div>
            
            <h2>{users.name}</h2>
            <p>Bio: {users.bio}</p>
        </div>
    )
}