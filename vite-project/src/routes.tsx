import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PaginaDeExemplo from './pages/PaginaDeExemplo'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Doacoes from './pages/Doações'

export const Rotas = () => {
    
    return(
        <BrowserRouter>
            <Routes>

                <Route 
                    path='/'
                    element={<Login />}
                />
                <Route 
                    path='/dashboard'
                    element={<Dashboard />}
                />
                <Route 
                    path='/usuarios'
                    element={<Usuarios />}
                />
                <Route 
                    path='/usuarios/:id'
                    element={<GerenciarUsuarios />}
                />
                <Route
                    path='/exemplo'
                    element={<PaginaDeExemplo />}
                />
                <Route 
                    path='/doacoes'
                    element={<Doacoes />}
                />


            </Routes>
        </BrowserRouter>
    )
}