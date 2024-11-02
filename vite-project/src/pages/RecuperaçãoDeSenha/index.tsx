import { SyntheticEvent, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';

export default function PasswordReset() {
    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true);
            const target = event.target as typeof event.target & {
                email: { value: string };
            };

            axios.post('http://localhost:3001/password-reset', {
                email: target.email.value,
            }).then(() => {
                setLoading(false);
                setToast(true);
            }).catch(() => {
                setLoading(false);
                setToast(true);
            });
        } else {
            refForm.current.classList.add('was-validated');
        }
    }, []);

    return (
        <>
            <Loading visible={loading} />
            <Toast show={toast} message='Email enviado para redefinição' colors='success' onClose={() => setToast(false)} />
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-primary'>Recuperação de Senha</h1>
                        <p className='text-secondary'>Digite seu email para redefinir sua senha</p>
                    </div>
                    <hr />
                    <form className='needs-validation' noValidate onSubmit={submitForm} ref={refForm}>
                        <div className='col-md-12'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='email' className='form-control' placeholder='Digite seu email' id='email' required />
                            <div className='invalid-feedback'>Por favor digite seu email</div>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button className='btn btn-primary w-100' type='submit'>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
