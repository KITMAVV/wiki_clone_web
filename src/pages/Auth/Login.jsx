import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { login as apiLogin } from '../../api/auth';
import './Auth.css';
import './Login.css';


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
                        <button
                            className="auth-tools-btn"
                            type="button"
                            aria-haspopup="listbox"
                            aria-expanded="false"
                        >
                            Інструменти ▾
                        </button>
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

                    <div className="login-placeholder" aria-hidden="true"></div>
                </div>
            </section>
        </PageLayout>
    );
}


// Todo проблема когда залогиненый то не пускает на страничку логина( НУЖНО ЗАМЕНИТЬ КНОПКУ ЛОГИНА НА КНОПКУ ВЫЙТИ)
