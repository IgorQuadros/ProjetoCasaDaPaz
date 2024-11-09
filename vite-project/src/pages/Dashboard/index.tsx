import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    // Verifica se o token é válido
    useEffect(() => {
        let lsStorage = localStorage.getItem('americanos.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        console.log("Pode desfrutar do sistema :D");
    }, [navigate]);

    return (
        <LayoutDashboard>
            <h1>Gráficos</h1>
            <p>Bem-vindo ao painel de controle. Aqui você pode visualizar dados importantes sobre doações e usuários.</p>

            {/* Seção para gráficos */}
            <div className="charts-container">
                <div className="chart">
                    <h3>Gráfico de Doações</h3>
                    <div style={{ height: '300px', backgroundColor: '#e1e1e1' }}>
                        {/* Aqui você pode integrar uma biblioteca de gráficos */}
                        <p>Gráfico de doações vai aqui!</p>
                    </div>
                </div>
                <div className="chart">
                    <h3>Gráfico de Usuários Ativos</h3>
                    <div style={{ height: '300px', backgroundColor: '#e1e1e1' }}>
                        {/* Aqui você pode integrar uma biblioteca de gráficos */}
                        <p>Gráfico de usuários ativos vai aqui!</p>
                    </div>
                </div>
            </div>

            {/* Estilos CSS */}
            <style>{`
                .charts-container {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0;
                }

                .chart {
                    flex: 1;
                    margin-right: 20px;
                }

                .chart:last-child {
                    margin-right: 0;
                }
            `}</style>
        </LayoutDashboard>
    );
}
