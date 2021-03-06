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
import DatosCandidato from './pages/datosCandidato.js';
import Entrada from './pages/entrada.js';
import GestionBolsa from './pages/gestionBolsa.js';
import VerLista from './pages/listadoIngredientes.js';
import VerListaUsuarios from './pages/listadoUsuarios.js';
import Login from './pages/login.js';
import MenuIngredientes from './pages/menuIngredientes.js';
import MenuUsuarios from './pages/menuUsuarios.js';
import NuevoIngrediente from './pages/nuevoIngrediente.js';
import NuevoPlato from './pages/nuevoPlato.js';
import NuevoUsuario from './pages/nuevoUser.js';
import Privacidad from './pages/privacidad.js';
import VerComanda from './pages/verComanda.js';
import MenuPlato from './pages/menuPlatos';
import VerListaPlat from './pages/listadoPlatos';

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
                    <Route path="/:user/admin/nuevoIngrediente" element={<NuevoIngrediente/>}/>
                    <Route path="/:user/admin/nuevoPlato" element={<NuevoPlato/>}/>
                    <Route path="/:user/admin/nuevoUsuario" element={<NuevoUsuario/>}/>
                    <Route path="/:user/admin/bolsaTrabajo" element={<GestionBolsa/>}/>
                    <Route path="/bolsa" element={<Bolsa/>}/>
                    <Route path="/privacidad" element={<Privacidad/>}/>
                    <Route path="/:user/admin/menuIngredientes" element={<MenuIngredientes/>}/>
                    <Route path="/:user/admin/verLista" element={<VerLista/>}/>
                    <Route path="/:user/admin/menuUsuarios" element={<MenuUsuarios/>}/>
                    <Route path="/:user/admin/verListaUsuarios" element={<VerListaUsuarios/>}/>
                    <Route path="/:user/admin/datosCandidato/:posicion" element={<DatosCandidato/>}/>
                    <Route path="/:user/admin/verListaPlat" element={<VerListaPlat/>}/>
                    <Route path="/:user/admin/menuPlatos" element={<MenuPlato/>}/>
                </Routes>
                
            </div>

            

        </Router>
        
    );
}          

export default App;