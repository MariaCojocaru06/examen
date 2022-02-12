import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function Participant() {
    const [participant, setparticipant] = useState([])
    let id = 0;
    const SERVER = `http://localhost:8080`;
    const eroare = (
        <div>
            <h1>Not  found</h1>
        </div>
    )
    const getPart = async () => {
        const href = window.location.href;
        console.log(href)
        const id = href.split('/').at(-2);
        console.log(id)
        fetch(`${SERVER}/api-participant/meetings/${id}/participanti`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Eroare!');
                }
            })
            .then((data) => {
                console.log(data)
                console.log('ok')
                setparticipant(data);
            })
            .catch((e) => { eroare() })


    }
    useEffect(() => {

        getPart()

    }, []);
    const getID = () => {
        const href = window.location.href;
        id = href.split('/').at(-2);
    }
    const deleteJob = async (idC) => {
        //preluam id ul job-ului
        const href = window.location.href;
        const id = href.split('/').at(-2);
        await fetch(`${SERVER}/api-participant/meetings/${id}/participanti/${idC}`, {
            method: 'DELETE',

        }).then((res) => res.json())
            .then((data) => { getPart() });
    }

    return (
        <div>
            <h1 >Lista de candidati</h1>
            <div><Button  onClick={ ()=>{ getID(); window.location.href = `/adaugare/${id}/participanti`}}>Adaugare</Button></div>
            <Table>
                <thead>
                    <tr>
                        <th>nume</th>
                        
                    </tr>
                </thead>
                <tbody  >
                    
                    {participant.map((c) => (

                        <tr  key={c.id}>
                            <td>{c.nume}</td>
                           
                            <td><Button onClick={() => deleteJob(c.id)}>STERGERE</Button></td>
                            <td> <Button onClick={() => {
                                getID();
                                window.location.href = `/meeting/${id}/participanti/${c.id}`
                            }}>EDITARE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
} export default Participant