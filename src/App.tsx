import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import Home from './pages/home'
import Caminhoes from './pages/caminhoes'
import Configuracoes from './pages/configuracoes'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />          
          <Route path="/caminhoes" element={<Caminhoes />} />          
          <Route path="/configuracoes" element={<Configuracoes />} />          
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
