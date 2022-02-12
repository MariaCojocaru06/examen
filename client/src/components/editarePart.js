import { useState, useEffect } from 'react'
import { Table, Col, Row, Form, Button } from 'react-bootstrap'

function EditarePart(){
    const [nume, setnume] = useState("")
    const SERVER = `http://localhost:8080`;
    useEffect(() => {
        const href = window.location.href;
        //preluare id candidat
        const idC = href.split('/').at(-1);
        console.log(idC)
        //preluare id job pentru care aplica candidatul
        const id = href.split('/').at(-3);
        console.log(id)
        
        //populam campurile cu datele initiale ale candidatului
        const getCand = async () => {
            //preluam
            const res = await fetch(`${SERVER}/api-participant/participants/${idC}`)
            const data = await res.json();
            console.log(data);
            
            setnume(data.nume);
           


        };
        getCand();

    }, []);
     //editare si salvare modificari
     const savePart = async () => {
       
        const href = window.location.href;
        const idC = href.split('/').at(-1);
        //metoda put din server
        await fetch(`${SERVER}/api-participant/participants/${idC}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //descriere si deadline preluate din campurile input
                nume: nume,
               
            }),
        }).then((res) => res.json())
            //dupa salvare facem intoarcerea la pagina principala
            .then((data) => {
                window.location.href = `http://localhost:3000`;
            }).catch((e) => console.log(`${e.message}`));


    }
    return (
        <Form>
            <div >Editare</div>
            <label >Nume</label>
            <input  type="text" placeholder='nume' value={nume} onChange={(evt) => setnume(evt.target.value)}></input>
           
            <Button  onClick={savePart}>SALVARE</Button>


        </Form>
    )


}
export default EditarePart