import AuthLayout from './AuthLayout';
import './Auth.css'
import './Login.css';

export default function Login() {
    return (
        <AuthLayout>
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
                    <form className="auth-form">
                        <div className="auth-form-field">
                            <label htmlFor="username" className="auth-form-label">Ім’я користувача</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="auth-form-input"
                                placeholder="Введіть ім’я користувача"
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
                            />
                        </div>

                        <div className="auth-form-row form-remember">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="auth-form-checkbox"
                            />
                            <label htmlFor="remember" className="auth-form-checkbox-label">
                                Запам’ятати мене
                            </label>
                        </div>

                        <button type="submit" className="auth-submit">Вхід</button>

                        <nav className="login-links">
                            <a href="#" className="login-link">Допомога з входом у систему</a>
                            <a href="#" className="login-link">Забули пароль?</a>
                        </nav>
                    </form>

                    <div className="login-placeholder" aria-hidden="true"></div>
                </div>
            </section>
        </AuthLayout>
    );
}
