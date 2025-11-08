import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { register as apiRegister } from '../../api/auth';
import DropInstrumentsButton from "../../components/DropInstrumentsButton/DropInstrumentsButton.jsx";
import './Auth.css';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const { signUp } = useAuth() || {};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);

        if (!name.trim()) return setErr('Введіть ім’я користувача');
        if (!email.includes('@')) return setErr('Введіть валідний email');
        if (password.length < 6) return setErr('Пароль має містити щонайменше 6 символів');
        if (password !== password2) return setErr('Паролі не співпадають');

        setLoading(true);
        try {
            const u = typeof signUp === 'function'
                ? await signUp({ name, email, password }, { remember })
                : await apiRegister({ name, email, password }, { remember });

            if (u) navigate('/home');
        } catch (e) {
            const msg =
                e?.payload?.message ||
                e?.payload?.errors?.email?.[0] ||
                e?.message ||
                'Помилка реєстрації';
            setErr(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <section className="auth-wrap">
                <h1 className="auth-title">Створити обліковий запис</h1>
                <hr className="auth-sep"/>

                <header className="auth-header">
                    <div className="auth-tools">
                        <DropInstrumentsButton/>
                    </div>
                </header>

                <hr className="auth-sep"/>

                <div className="auth-body">
                    <form className="auth-form" onSubmit={onSubmit}>
                        <div className="auth-form-field">
                            <label htmlFor="name" className="auth-form-label">Ім’я користувача</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="auth-form-input"
                                placeholder="Введіть ім’я користувача"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="auth-form-field">
                            <label htmlFor="password" className="auth-form-label">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="auth-form-input"
                                placeholder="Введіть пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />

                            <label htmlFor="password2" className="auth-form-label" style={{marginTop: 8}}>Підтвердити
                                пароль</label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                className="auth-form-input"
                                placeholder="Введіть пароль знову"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <p className="register-sub-text">Рекомендовано використати унікальний пароль</p>
                        </div>

                        <div className="auth-form-field">
                            <label htmlFor="email" className="auth-form-label">Електронна пошта</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="auth-form-input"
                                placeholder="Введіть вашу адресу електронної пошти"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                            <p className="register-sub-text">Електронна пошта потрібна на випадок втрати пароля</p>
                        </div>

                        <div className="auth-form-row form-remember">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="auth-form-checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember" className="auth-form-checkbox-label">
                                Запам’ятати мене
                            </label>
                        </div>

                        <button type="submit" className="auth-submit" disabled={loading}>
                            {loading ? 'Створюю…' : 'Створити'}
                        </button>

                        {err && (
                            <div className="auth-error" role="alert" style={{marginTop: 12}}>
                                {typeof err === 'string' ? err : JSON.stringify(err)}
                            </div>
                        )}
                    </form>

                    <img
                        className="register-logo"
                        src="/register-logo.png"
                        alt=""
                        aria-hidden="true"
                    />
                </div>
            </section>
        </PageLayout>
    );
}
