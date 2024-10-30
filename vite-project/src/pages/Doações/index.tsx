import { useNavigate } from "react-router-dom"
import { LayoutDashboard } from "../../components/LayoutDashboard"
import { useEffect, useState } from "react"
import { IToken } from "../../interfaces/token"
import { validaPermissao, verificaTokenExpirado } from "../../services/token"
import { Loading } from "../../components/Loading"
import axios from "axios"

interface IDoacoes {
    id: number
    doador: string
    data: string
    valor: number
}

export default function Doacoes() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [dadosDoacoes, setDadosDoacoes] = useState<Array<IDoacoes>>([])

    useEffect(() => {
        const lsStorage = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/")
        }

        if (!validaPermissao(['admin', 'secretarios'], token?.user.permissoes)) {
            navigate('/dashboard')
        }

        setLoading(true)
        axios.get('http://localhost:3001/doacoes') // URL da API de doações
            .then((res) => {
                setDadosDoacoes(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="d-flex justify-content-between mt-3">
                    <h1 className="h2">Histórico de Doações</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Doador</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosDoacoes.map((doacao, index) => (
                            <tr key={index}>
                                <th scope="row">{doacao.id}</th>
                                <td>{doacao.doador}</td>
                                <td>{doacao.data}</td>
                                <td>{doacao.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </LayoutDashboard>
        </>
    )
}
