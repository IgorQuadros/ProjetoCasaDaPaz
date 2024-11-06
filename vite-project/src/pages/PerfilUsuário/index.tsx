import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { LayoutDashboard } from '../../components/LayoutDashboard';

export default function UserProfile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/user-profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('americanos.token')}`
            }
        }).then(response => {
            setUser(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return <Loading visible={true} />;

    return (
        <LayoutDashboard>
            <div className={styles.main}>
                <div className={styles.border}>
                    <h1 className='text-primary'>Perfil do Usuário</h1>
                    <div>
                        <p className='text-secondary'>Nome: {user ? user.name : 'Nome não disponível'}</p>
                        <p className='text-secondary'>Email: {user ? user.email : 'Email não disponível'}</p>
                        <p className='text-secondary'>Telefone: {user ? user.permissoes : 'Permissões não disponíveis'}</p>
                        <p className='text-secondary'>Endereço: {user ? user.senha : 'Senha não disponível'}</p>
                        <button className='btn btn-primary mt-3' onClick={() => alert('Em construção')}>Editar Perfil</button>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}
