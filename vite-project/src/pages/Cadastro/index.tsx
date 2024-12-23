import { SyntheticEvent, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true);
            const target = event.target as typeof event.target & {
                email: { value: string };
                senha: { value: string };
                confirmSenha: { value: string };
            };

            if (target.senha.value !== target.confirmSenha.value) {
                setToast(true);
                setLoading(false);
                return;
            }

            axios.post('http://localhost:3001/register', {
                email: target.email.value,
                password: target.senha.value,
            }).then(() => {
                navigate('/login');
            }).catch(() => {
                setToast(true);
                setLoading(false);
            });
        } else {
            refForm.current.classList.add('was-validated');
        }
    }, []);

    return (
        <>
            <Loading visible={loading} />
            <Toast show={toast} message='Erro no cadastro' colors='danger' onClose={() => setToast(false)} />
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-primary'>Cadastro</h1>
                        <p className='text-secondary'>Preencha os campos para se cadastrar</p>
                    </div>
                    <hr />
                    <form className='needs-validation' noValidate onSubmit={submitForm} ref={refForm}>
                        <div className='col-md-12'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='email' className='form-control' placeholder='Digite seu email' id='email' required />
                            <div className='invalid-feedback'>Por favor digite seu email</div>
                        </div>
                        <div className='col-md-12 mt-1'>
                            <label htmlFor='senha' className='form-label'>Senha</label>
                            <input type='password' className='form-control' placeholder='Digite sua senha' id='senha' required />
                            <div className='invalid-feedback'>Por favor digite sua senha</div>
                        </div>
                        <div className='col-md-12 mt-1'>
                            <label htmlFor='confirmSenha' className='form-label'>Confirme a Senha</label>
                            <input type='password' className='form-control' placeholder='Confirme sua senha' id='confirmSenha' required />
                            <div className='invalid-feedback'>Confirme sua senha</div>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button className='btn btn-primary w-100' type='submit'>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
