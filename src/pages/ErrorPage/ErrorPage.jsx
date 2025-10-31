import { useNavigate } from "react-router-dom";
import "./ErrorPage.css"
export default function ErrorPage({ status = 500, message = "" }) {
    const navigate = useNavigate();

    const errors = {
        404: {
            title: "404 — Нот Фаунд",
            text: "Перевірте URL або повернітся на головну.",
            action: { label: "На головну", onClick: () => navigate("/home") },
        },
        401: {
            title: "401 — Unauthorized",
            text: "Щоб продовжити потрібно увійти в систему.",
            action: { label: "Увійти", onClick: () => navigate("/login") },
        },
        403: {
            title: "403 — Forbidden",
            text: "У вас немає прав для перегляду цього розділу :(",
            action: { label: "Повернутись", onClick: () => navigate(-1) },
        },
        500: {
            title: "500 — Internal Server Error",
            text: "Сталася внутрішня помилка на сервері. Спробуйте пізніше :)",
            action: { label: "Оновити сторінку", onClick: () => location.reload() },
        },
        0: {
            title: "Offline",
            text: "Немає з'єднання з сервером. Перевірте інтернет підключення.",
            action: { label: "Повторити", onClick: () => location.reload() },
        },
    };

    const { title, text, action } = errors[status] || errors[500];

    return (

        <main className="error-page">
            <div className="error-page__box">
                <h1 className="error-page__title">{title}</h1>
                <p className="error-page__text">{message || text}</p>

                {action && (
                    <button
                        className="error-page__button"
                        onClick={action.onClick}
                    >
                        {action.label}
                    </button>
                )}
            </div>
        </main>
    );
}

// ПРИКЛАД ВИКОРИСТАННЯ :)

// if (error?.status === 404) return <ErrorPage status={404} />;
// if (error?.status === 401) return <ErrorPage status={401} />;
// if (error?.status === 403) return <ErrorPage status={403} />;
// if (error?.status === 0)   return <ErrorPage status={0} />;
// if (error) return <ErrorPage status={500} message={error.message} />;
