import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/aluno" element={<Aluno />} />
      </Routes>
    </>
  )
}

export default App
