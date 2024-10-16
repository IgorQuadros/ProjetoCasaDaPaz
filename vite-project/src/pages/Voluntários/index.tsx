import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { LayoutDashboard } from "../../components/LayoutDashboard";

export default function Voluntarios(){
    const navigate = useNavigate()

    useEffect(() => {
        let lsStorage = localStorage.getItem('americanos.token')
        let token: IToken | null = null

        if(typeof lsStorage === 'string'){
            token = JSON.parse(lsStorage)
        }

        if(!token || verificaTokenExpirado(token.accessToken)){
            navigate("/")
        }

        console.log("Pode desfrutar do sistema :D")
    }, [])

    return(
        <LayoutDashboard>
            <h1>Voluntários</h1>
        </LayoutDashboard>
    )
}