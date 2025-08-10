import AuthLayout from './AuthLayout';
import './Login.css'
export default function Login() {
    return (
        // ToDo почистити осьо все і написати нормальні стилі а не чатовскі
        <AuthLayout>
            <section className="auth-wrap">
                <header className="auth-header">
                    <h1>Вхід до системи</h1>
                    <div className="auth-tools">
                        <button type="button" aria-haspopup="listbox" aria-expanded="false">
                            Інструменти ▾
                        </button>
                    </div>
                </header>

                <hr className="auth-sep" />

                <div className="auth-body">
                    <form className="auth-form">
                        <div className="form-field">
                            <label htmlFor="username">Ім’я користувача</label>
                            <input id="username" name="username" type="text" placeholder="Введіть ім’я користувача" />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">Пароль</label>
                            <input id="password" name="password" type="password" placeholder="Введіть пароль" />
                        </div>

                        <div className="form-row">
                            <input id="remember" name="remember" type="checkbox" />
                            <label htmlFor="remember">Запам’ятати мене</label>
                        </div>

                        <button type="submit">Вхід</button>

                        <nav className="auth-links">
                            <a href="#">Допомога з входом у систему</a>
                            <a href="#">Забули пароль?</a>
                        </nav>
                    </form>
                    <div className="auth-placeholder" aria-hidden="true" />
                </div>
            </section>
        </AuthLayout>
    );
}
