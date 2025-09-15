import './CreateArticleForm.css'

export default function CreateArticleForm() {
    return (
        <form className="createArticleForm-form">
            <div className="createArticleForm-field">
                <label htmlFor="article-name" className="createArticleForm-label"><b>Назва статті</b> – коротка та чітка
                    (наприклад, Пляжі Тирани, Кращі кав’ярні Дурреса).</label>
                <input
                    id="article-name"
                    name="article-name"
                    type="text"
                    className="createArticleForm-input"
                />
            </div>
            <div className="createArticleForm-field createArticleForm-field--spaced">
                <label htmlFor="article-category" className="createArticleForm-label"><b>Категорія</b> – виберіть тематичний розділ (парки, готелі, транспорт, історичні місця тощо).</label>
                <input
                    id="article-category"
                    name="article-categorie"
                    type="text"
                    className="createArticleForm-input"
                />
            </div>
            <div className="createArticleForm-field">
                <label htmlFor="article-text" className="createArticleForm-label"><b>Основний текст</b> – тут
                    розміщується зміст статті з фото, картами, порадами.</label>
                <textarea
                    id="article-text"
                    name="article-text"
                    rows={5}
                    className="createArticleForm__textarea"
                />
            </div>

            <div className="createArticleForm__actions">
                <button type="button" className="createArticleForm__btn">
                    Попередній перегляд
                </button>
                <button type="submit" className="createArticleForm__btn">
                    Опублікувати
                </button>
            </div>
        </form>
    );
}
