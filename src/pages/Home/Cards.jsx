import './Cards.css'

export default function Card({ title, text, imageUrl, alt = '', ctaText = 'Button text', ctaHref = '#', linkText = 'Link text', linkHref = '#', variant = 'default', imageSize = 'sm', hideLink = false, className = '' }) {
    const mods = [
        variant === 'imageTop' ? 'card--image-top' : '',
        `card--img-${imageSize}`,
        hideLink ? 'card--no-link' : '',
        variant === 'list' ? 'card--list' : ''
    ]
        .filter(Boolean)
        .join(' ')

    const isList = variant === 'list'
    const listItems = isList
        ? (Array.isArray(text) ? text : String(text || '').split(/\r?\n+/)).filter(Boolean)
        : []

    return (
        <article className={`card ${mods} ${className}`}>
            <header className="card__header">
                <h1 className="card__title">{title}</h1>
            </header>

            <div className="card__body">
                {imageUrl && <img className="card__image" src={imageUrl} alt={alt} />}

                {isList ? (
                    <div className="card__list">
                        {listItems.map((line, i) => (
                            <p key={i} className="card__text card__text--list">{line}</p>
                        ))}
                    </div>
                ) : (
                    text && <p className="card__text">{text}</p>
                )}
            </div>

            <footer className="card__footer">
                <a className="card__btn" href={ctaHref}>{ctaText}</a>
                {!hideLink && (
                    <a className="card__link" href={linkHref}>{linkText}</a>
                )}
            </footer>
        </article>
    )
}
