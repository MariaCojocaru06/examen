import { useState, useEffect } from 'react'
import { Table, Col, Row, Form, Button } from 'react-bootstrap'

function Editare(){
    const [descriere,setdescriere]=useState("")
    const [url, seturl]=useState("")
    const[data,setdata]=useState("")
    const SERVER = `http://localhost:8080`;

    useEffect(() => {
        //preluam id ul trimis din pagina de home
        const href = window.location.href;
        console.log(href)
        const id = href.split('/').at(-1);
        //populam campurile
        const getMeeet = async () => {
            const res = await fetch(`${SERVER}/api-meeting/meetings/${id}`)
            const data = await res.json();
            console.log(data);
            setdescriere(data.descriere)
            seturl(data.url)
            setdata(data.data);
            
        };
        getMeeet();

    }, []);

     //editare si salvare modificari
     const saveMeet=async()=>{
        const href = window.location.href;
        const id = href.split('/').at(-1);
        
        await fetch(`${SERVER}/api-meeting/meetings/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                //descriere si deadline preluate din campurile input
                descriere: descriere, 
                url:url,
                data:data
             }),
        }).then((res) => res.json())
        //dupa salvare facem intoarcerea la pagina principala
        .then((data)=>{window.location.href = 'http://localhost:3000/';
        }).catch((e)=>console.log(`${e.message}`));


    }

    return (
        <div>
            <Form>
                <h1 > EDITARE</h1>
                <label >descriere</label>
                <input type="text" placeholder='descriere' value={descriere} onChange={(evt) => setdescriere(evt.target.value)}></input>
                <label >url</label>
                <input  type="text" placeholder='url' value={(url)} onChange={(evt) => seturl(evt.target.value)}></input>
                <label >data</label>
                <input  type="text" placeholder='data' value={(data)} onChange={(evt) => setdata(evt.target.value)}></input>
               
                <Button onClick={saveMeet} >SALVARE</Button>

            </Form>
        </div>
    )
}export default Editare;