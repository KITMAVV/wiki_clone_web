import "./FavoritesCards.css";



export default function FavoritesCard({ imageUrl, title, category, date, description, onOpen, onDelete, }) {
    return (
        <div className="favorites-card">
            <img className="favorites__img" src={imageUrl} alt={title} />
            <div className="favorites__body">
                <h3 className="favorites__title">{title}</h3>

                <div className="favorites__meta">
                    <div><b>Категорія:</b> {category}</div>
                    <div><b>Додано:</b> {date}</div>
                    <div className="favorites__desc">{description}</div>
                </div>

                <div className="favorites__actions">
                    <button className="favorites__btn favorites__btn--open" onClick={onOpen}>
                        Відкрити
                    </button>
                    <button className="favorites__btn favorites__btn--delete" onClick={onDelete}>
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
