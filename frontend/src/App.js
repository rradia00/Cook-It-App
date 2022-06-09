import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Admin from './pages/Admin.js';
import Bolsa from './pages/bolsa.js';
import Camarero from './pages/camarero.js';
import Cocinero from './pages/cocinero.js';
import Comanda from './pages/comanda.js';
import Compras from './pages/compras.js';
import Entrada from './pages/entrada.js';
import Login from './pages/login.js';
import NuevoIngrediente from './pages/nuevoIngrediente.js';
import NuevoPlato from './pages/nuevoPlato.js';
import NuevoUser from './pages/nuevoUser.js';
import Privacidad from './pages/privacidad.js';
import VerComanda from './pages/verComanda.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
            
            <Route path="/" element={<Entrada/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/:user/camarero" element={<Camarero/>}/>
            <Route path="/:user/cocinero" element={<Cocinero/>}/>
            <Route path="/:user/comanda/:mesa" element={<Comanda/>}/>
            <Route path="/:user/verComanda/:mesa" element={<VerComanda/>}/>
            <Route path="/:user/admin" element={<Admin/>}/>
            <Route path="/:user/compras" element={<Compras/>}/>
            <Route path="/user/admin/nuevoIngrediente" element={<NuevoIngrediente/>}/>
            <Route path="/user/admin/nuevoPlato" element={<NuevoPlato/>}/>
            <Route path="/user/admin/nuevoUser" element={<NuevoUser/>}/>
            <Route path="/bolsa" element={<Bolsa/>}/>
            <Route path="/privacidad" element={<Privacidad/>}/>
            
        </Routes>
      </div>
    </Router>
  );
}          

export default App;