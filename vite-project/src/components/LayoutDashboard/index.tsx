import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IToken } from '../../interfaces/token';
import { validaPermissao } from '../../services/token';

interface IProps {
    children: ReactNode;
}

export const LayoutDashboard = (props: IProps) => {
    const [token, setToken] = useState<IToken | undefined>();

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token');
        let token: IToken | undefined;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken);
            setToken(token);
        }
    }, []);

    
    return (
        <>
             {/* Header com menu */}
            <header className="header">
                <a className="navbar-brand" href="#">
                    Casa da Paz
                </a>
                <nav className="nav-menu">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    {validaPermissao(['admin', 'secretarios'], token?.user.permissoes) && (
                        <Link className="nav-link" to="/usuarios">Usuários</Link>
                    )}
                    <Link className="nav-link" to="/doacoes">Doações</Link>
                    <Link className='nav-link' to="/perfil">Perfil</Link>
                    <Link className="nav-link" to="/">Sair</Link>
                </nav>
            </header>

            {/* Conteúdo principal */}
            <main className="main-content">
                {props.children}
            </main>

            {/* Footer */}
            <footer className="footer">
                Desenvolvido por alunos da UniAlfa!
            </footer>

            {/* Estilos CSS */}
            <style>{`
                .header {
                    background-color: #184c32; /* Verde escuro */
                    padding: 20px 15px;
                    color: white;
                    display: flex; /* Usando Flexbox */
                    justify-content: space-between; /* Espaçamento entre os itens */
                    align-items: center; /* Centralizando verticalmente */
                }

                .navbar-brand {
                    color: #f9f9fc; /* Branco do site */
                    text-decoration: none; /* Removendo o sublinhado */
                }

                .nav-menu {
                    display: flex; /* Menu de navegação em linha */
                    gap: 15px; /* Espaço entre os links */
                }

                .nav-link {
                    color: #f9f9fc; /* Branco do site */
                    text-decoration: none; /* Removendo o sublinhado */
                    transition: color 0.3s;
                }

                .nav-link:hover {
                    color: #9bcf68; /* Verde claro no hover */
                }

                .main-content {
                    background-color: #f1f3f5; /* Cor do fundo do conteúdo principal */
                    padding: 20px;
                    min-height: 100vh;
                }

                .footer {
                    background-color: #184c32; /* Verde escuro */
                    color: #f9f9fc; /* Branco do site */
                    padding: 10px;
                    text-align: center;
                    margin-top: 20px;
                }
            `}</style>
        </>
    );    
};
