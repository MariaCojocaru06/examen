import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home';
import Editare from './components/editareMeeting';
import Adauga from './components/adaugareMeeting';
import Participant from './components/participant';
import AddParticipant from './components/adaugarePart';
import EditarePart from './components/editarePart';
function App() {
  return (
    <div >
      <Container>
        <Router>
          <Routes>
            <Route path='' element={<Home />}></Route>
            <Route path='/editare/:id' element={<Editare/>}></Route>
            <Route path='/adauga' element={<Adauga/>}></Route>
            <Route path='/meeting/:id/participanti' element={<Participant/>}></Route>
            <Route path='/adaugare/:id/participanti' element={<AddParticipant/>}></Route>
            <Route path='/meeting/:id/participanti/:idP' element={<EditarePart/>}></Route>
          </Routes>
        </Router>
      </Container>
      
    </div>
  );
}

export default App;
