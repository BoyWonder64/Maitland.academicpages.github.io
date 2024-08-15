import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit(){

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
        
    });
    
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData(){
            const id = params.id.toString();
            const response = await fetch(`http://localhost:4000/record/${id}`);
            if(!response.ok){
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }   
            const responseRecord = await response.json();
            if(!responseRecord) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
            }
            setForm(responseRecord);
            return;

        }
        fetchData();
        return;
    },[params.id, navigate]);

    function updateForm(jsonObj){
        return setForm((prevJsonObj) => {
            return {...prevJsonObj, ...jsonObj};
        })
    }

    async function onSubmit(e){
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level
        };
        await fetch(`http://localhost:4000/update/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(editedPerson),
        })
        .catch(error => {
            window.alert(error);
            return
        });
        navigate("/");
    }

    return(
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name: </label>
                    <input 
                    type = "text"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                 <div>
                    <label>Position: </label>
                    <input 
                    type = "text"
                    id="level"
                    value={form.position}
                    onChange={(e) => updateForm({ level: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                           type="radio"
                           name="positionOptions"
                           id="positionIntern"
                           value="Intern"
                           checked={form.level === "Intern"}
                           onChange={(e) => updateForm({ level: e.target.value })}/>
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                </div>
                <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
       </div>
       <br />
                <br/>
                <input
                type="submit"
                value="Update Record"
                />
            </form>
        </div>
    );
}