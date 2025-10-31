import "./CreateArticleForm.css";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../../hooks/useDraft.js";

const DRAFT_KEY = "createArticle:draft";

export default function CreateArticleForm({onSubmit, submitting = false}) {
    const nav = useNavigate();

    const { values, setValues, clearDraft } = useDraft(DRAFT_KEY, {
        title: "",
        category: "",
        body: "",
    });
    const { title, category, body } = values;

    const onChange = (field) => (e) => {
        const val = e?.target ? e.target.value : e;
        setValues((v) => ({ ...v, [field]: val }));
    };

    const handlePreview = () => {
        const payload = { title, category, markdown: `From WikiTravel, the free travel encyclopedia\n\n${body}` };
        nav("/create-article/preview", { state: payload });
        sessionStorage.setItem("articlePreviewDraft", JSON.stringify(payload));
    };

    const handleDelete = () => {
        clearDraft();
        setValues({title: "", category: "", body: ""});
        alert("Чернетку очищено");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await onSubmit?.({ title, body, category });
        if (ok) {
            clearDraft();
            setValues({ title: "", category: "", body: "" });
        }
    };

    return (
        <form className="createArticleForm-form" onSubmit={handleSubmit}>
            <div className="createArticleForm-field">
                <label htmlFor="article-name" className="createArticleForm-label">
                    <b>Назва статті</b> – коротка та чітка (наприклад, Пляжі Тирани, Кращі кав’ярні Дурреса).
                </label>
                <input
                    id="article-name"
                    name="article-name"
                    type="text"
                    className="createArticleForm-input"
                    value={title}
                    onChange={onChange("title")}
                />
            </div>

            <div className="createArticleForm-field createArticleForm-field--spaced">
                <label htmlFor="article-category" className="createArticleForm-label">
                    <b>Категорія</b> – виберіть тематичний розділ (парки, готелі, транспорт, історичні місця тощо).
                </label>
                <input
                    id="article-category"
                    name="article-categorie"
                    type="text"
                    className="createArticleForm-input"
                    value={category}
                    onChange={onChange("category")}
                />
            </div>

            <div className="createArticleForm-field">
                <label htmlFor="article-text" className="createArticleForm-label">
                    <b>Основний текст</b> – тут розміщується зміст статті з фото, картами, порадами.
                </label>
                <textarea
                    id="article-text"
                    name="article-text"
                    rows={8}
                    className="createArticleForm__textarea"
                    value={body}
                    onChange={onChange("body")}
                    placeholder=""
                />
            </div>

            <div className="createArticleForm__actions">
                <button type="button" className="createArticleForm__btn" onClick={handlePreview}>
                    Попередній перегляд
                </button>
                <button type="button" className="createArticleForm-btn-delete" onClick={handleDelete}>
                    X
                </button>
                <button type="submit" disabled={submitting} className="createArticleForm__btn">
                    {submitting ? "Зберігаю..." : "Опублікувати"}
                </button>
            </div>
        </form>
    );
}
