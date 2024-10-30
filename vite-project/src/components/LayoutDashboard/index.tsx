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

    // Estilos personalizados
    const styles = {
        header: {
            backgroundColor: '#20B2AA',
            padding: '10px 15px',
            color: 'white',
        },
        sidebar: {
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #dee2e6',
            minHeight: '100vh',
        },
        sidebarNavItem: {
            padding: '10px',
        },
        navLink: {
            fontSize: '1rem',
            color: '#495057',
            padding: '10px 20px',
            transition: 'background-color 0.3s, color 0.3s',
            textDecoration: 'none',
            display: 'block',
        },
        navLinkHover: {
            backgroundColor: '#e9ecef',
            color: '#007bff',
            borderRadius: '5px',
        },
        mainContent: {
            backgroundColor: '#f1f3f5',
            padding: '20px',
            minHeight: '100vh',
            borderLeft: '1px solid #dee2e6',
        },
    };

    return (
        <>
            {/* Cabeçalho */}
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0" style={styles.header}>
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                    Sistema Autenticação
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <Link className="nav-link px-3" to="/">
                            Sair
                        </Link>
                    </div>
                </div>
            </header>

            {/* Container principal */}
            <div className="container-fluid">
                <div className="row">
                    {/* Menu lateral */}
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={styles.sidebar}>
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item" style={styles.sidebarNavItem}>
                                    <Link className="nav-link" to="/dashboard" style={styles.navLink}>
                                        Dashboard
                                    </Link>
                                </li>
                                {validaPermissao(['admin', 'secretarios'], token?.user.permissoes) && (
                                    <li className="nav-item" style={styles.sidebarNavItem}>
                                        <Link className="nav-link" to="/usuarios" style={styles.navLink}>
                                            Usuários
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item" style={styles.sidebarNavItem}>
                                    <Link className="nav-link" to="/doacoes" style={styles.navLink}>
                                        Doações
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Conteúdo principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={styles.mainContent}>
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
};
