import { useState, useEffect } from 'react'
import { Table, Col, Row, Form, Button } from 'react-bootstrap'

function AddParticipant(){
    const SERVER = `http://localhost:8080`;
    const [nume, setnume] = useState("")

    const add=()=>{
         //preluare id pentru meetingul la care adaugam candidati
         const href = window.location.href;
         const id = href.split('/').at(-2);
         console.log(id)
         fetch(`${SERVER}/api-participant/meetings/${id}/participanti`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ 
             nume:nume,
            
              }),
           })
             .then((res) => res.json())
             .then((deadline)=>{window.location.href = `http://localhost:3000`;
               console.log(`Candidat ${nume} adaugat cu succes!`)
             }).catch((e)=>console.log(`Adaugare ${nume} esuata! `));
    

    }
    return (
        <div>
            <Form >
            <div >Adaugare</div>
            <label > Nume</label>
            <input   type="text" placeholder='nume' value={nume} onChange={(evt) => setnume(evt.target.value)}></input>
            
            <Button className="buttonNew" onClick={add}>SALVARE</Button>     </Form>
        </div>
    )

}export default AddParticipant;