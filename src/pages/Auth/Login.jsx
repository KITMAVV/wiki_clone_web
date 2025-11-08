import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { login as apiLogin } from '../../api/auth';
import './Auth.css';
import './Login.css';
import DropInstrumentsButton from "../../components/DropInstrumentsButton/DropInstrumentsButton.jsx";


export default function Login() {
    const navigate = useNavigate();
    const { user, ready, signIn } = useAuth() || {};
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (ready && user) navigate('/');
    }, [ready, user, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);

        if (!identifier.includes('@')) {
            setErr('Введіть email');
            return;
        }

        setLoading(true);
        try {
            let u = null;
            if (typeof signIn === 'function') {
                u = await signIn(identifier, password, { remember });
            } else {
                u = await apiLogin(identifier, password, { remember });
            }

            if (u) navigate('/home');
        } catch (e) {

            const msg =
                e?.payload?.message ||
                e?.payload?.errors?.email?.[0] ||
                e?.message ||
                'Помилка входу';
            setErr(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <section className="auth-wrap">
                <h1 className="auth-title">Вхід до системи</h1>
                <hr className="auth-sep" />

                <header className="auth-header">
                    <div className="auth-tools">
                        <DropInstrumentsButton/>
                    </div>
                </header>

                <hr className="auth-sep" />

                <div className="auth-body">
                    <form className="auth-form" onSubmit={onSubmit}>
                        <div className="auth-form-field">
                            <label htmlFor="identifier" className="auth-form-label">Email</label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="email"
                                className="auth-form-input"
                                placeholder="Введіть вашу адресу електронної пошти"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                autoComplete="username"
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
                                autoComplete="current-password"
                                required
                            />
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
                            {loading ? 'Входжу…' : 'Вхід'}
                        </button>

                        {err && (
                            <div className="auth-error" role="alert" style={{marginTop:12}}>
                                {typeof err === 'string' ? err : JSON.stringify(err)}
                            </div>
                        )}

                        <nav className="login-links">
                            <a href="#" className="login-link">Допомога з входом у систему</a>
                            <a href="#" className="login-link">Забули пароль?</a>
                        </nav>
                    </form>

                    <svg
                        className="login-logo"
                        aria-hidden="true"
                        width="217"
                        height="175"
                        viewBox="0 0 217 175"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_112_1553)">
                            <path d="M68.2402 64.67V174.15H109.46V59L68.2402 64.67Z" fill="black"/>
                            <path
                                d="M191.7 0L24.1499 26.64V63.53L67.0599 57.62L108.28 51.95L195.22 39.98L216.68 16.75L191.7 0Z"
                                fill="#575756"/>
                            <path d="M113.62 87.41L19.99 73.3L0 89.47L15.87 111.52L113.62 121.45V87.41Z"
                                  fill="#E9E335"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_112_1553">
                                <rect width="216.68" height="174.15" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </section>
        </PageLayout>
    );
}
