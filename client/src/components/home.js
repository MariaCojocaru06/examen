import { useState, useEffect } from 'react'
import './aspect.css'

import { Table, Col, Button, Row, Form } from 'react-bootstrap'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
function Home() {
    const SERVER = `http://localhost:8080`;
    const [meeting, setmeeting] = useState([])

    const getMeeting = async () => {
        fetch(`${SERVER}/api-meeting/meetings`, {
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
                setmeeting(data);
            })
            .catch((e) => { })
    }
    useEffect(() => {
        getMeeting()
    }, [])

    //STERGEREA UNUI MEETING
    const deleteMeet=async(id)=>{
        await fetch(`${SERVER}/api-meeting/meetings/${id}`, {
            method: 'DELETE',
      
          }).then((res) => res.json())
            .then((data) => { getMeeting(); console.log("stergere apelata") });//reafisare a joburilor
       
    }
    //EXPORT  IN CSV
  const exportToCSV = async () => {
    const res = await fetch(`http://localhost:8080/api-meeting/export`);
    const job = await res.json();
    console.log(job)
    //pentru fiecare job scriem pe rand candidatii
    for (let d of job) {
      console.log(d.participants)
      if (d.participants.length> 0) {
        let string = '';
        for (let candidat of d.participants) {
          string += `${candidat.id},${candidat.nume},`;
        }
        d.participants = string;
      }
    } const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(job);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'meetings' + fileExtension);
  }

    

    return(<>

    <Col lg="20">
        <h1>Lista meeting</h1>
        <Button onClick={() => window.location.href = `/adauga`}>ADAUGA MEETING</Button>
        <Button className='btn' onClick={()=>exportToCSV()}>EXPORT</Button>
        <Table>
        <thead>
            <tr >
              <th >descriere</th>
              <th >url</th>
              <th> data</th>
            </tr>
          </thead>
          <tbody  >
            {meeting.map((list) => (
              <tr key={list.id}>
                <td  >{list.descriere}</td>
                <td >{list.url}</td>
                <td>{list.data}</td>
                <td><Button onClick={()=>deleteMeet(list.id)}>STERGERE</Button></td>
                {/* editare job=> trimitem id-ul ca parametru */}
                <td><Button  onClick={() => window.location.href = `/editare/${list.id}`}>Editare</Button></td> 
                {/* vizualizare candidati trimitem ca parametru id job */}
                <td><Button  onClick={()=>window.location.href=`/meeting/${list.id}/participanti`}>CANDIDATI</Button></td>

              </tr>
            ))}
          </tbody>
        </Table>
    </Col>
    </>)


} export default Home;