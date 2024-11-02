import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';

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
        <div className={styles.main}>
            <div className={styles.border}>
                <h1 className='text-primary'>Perfil do Usuário</h1>
                {user ? (
                    <div>
                        <p className='text-secondary'>Nome: {user.name}</p>
                        <p className='text-secondary'>Email: {user.email}</p>
                        <button className='btn btn-primary mt-3' onClick={() => alert('Em construção')}>Editar Perfil</button>
                    </div>
                ) : (
                    <p className='text-secondary'>Usuário não encontrado.</p>
                )}
            </div>
        </div>
    );
}
