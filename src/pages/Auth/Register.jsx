import AuthLayout from './AuthLayout';
import './Auth.css'
import './Register.css'

export default function Register() {
    return (
        <AuthLayout>
            <section className="auth-wrap">
                <h1 className="auth-title">Створити обліковий запис</h1>
                <hr className="auth-sep"/>

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

                <hr className="auth-sep"/>

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
                            <p className={"register-sub-text"}>Рекомендовано використати унікальний пароль</p>
                            <label htmlFor="check-password" className="auth-form-label">Підтвердити пароль</label>
                            <input
                                id="check-password"
                                name="check-password"
                                type="check-password"
                                className="auth-form-input"
                                placeholder="Введіть пароль знову"
                            />
                        </div>
                        <div className="auth-form-field">
                            <label htmlFor="email" className="auth-form-label">Електронна пошта</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="auth-form-input"
                                placeholder="Введіть вашу адресу електронної пошти"
                            />
                            <p className={"register-sub-text"}>Електронна пошта потрібна на випадок втрати пароля</p>
                        </div>
                        <button type="submit" className="auth-submit">Створити</button>
                    </form>

                    <div className="register-placeholder" aria-hidden="true"></div>
                </div>
            </section>
        </AuthLayout>
    );
}
