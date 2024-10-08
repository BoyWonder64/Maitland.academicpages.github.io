import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//One React component for the entire table (Records)
//Another React componet for each row of the result set (Record)
const Record = (props) => (
    <tr>
        <td>{props.record.firstName}</td>
        <td>{props.record.lastName}</td>
        <td>{props.record.email}</td>
        <td>{props.record.role}</td>
        <td><Link to={`/edit/${props.record._id}`}>Edit</Link></td>
    </tr>
);

export default function Records(){
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords(){
            const response = await fetch('http://localhost:4000/record');
            if(!response.ok){
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }   
            const responseRecords = await response.json();
            setRecords(responseRecords);
            return;

        }
        getRecords();
        return;
    },[records.length]);
    
    function recordList(){
        return records.map((record) => {
            return(
                <Record
                record={record}
                key={record._id}
                />
            );
        });
    }
     return (
        <div>
            <h3>Record List</h3>
            <table style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
     );
    }
