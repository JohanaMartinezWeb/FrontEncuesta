import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import Home from './components/Home'
import Create from './components/Create';
import Encuesta from './components/Encuesta';
import Resultados from './components/Resultados'; 
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
      <div className="app container">
      <Header />
        <Routes>
          <Route path='/' index  element={<Home/>} />
          <Route path='/demo/:id'  element={<Demo/>} />
          <Route path='/new/:id'  element={<Create/>} />
          <Route path='/encuesta/:id'  element={<Encuesta/>} />
          <Route path='/resultado/:id'  element={<Resultados/>} />
        </Routes> 
      </div>
    </BrowserRouter>
  )
}

export default App