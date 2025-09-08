import "./Comment.css";

export default function Comment({ id, name, status, imageUrl, date, time, text }) {
    return (
        <article className="comment" aria-labelledby={`c-${id}-title`}>
            <img
                className="comment__avatar"
                src={imageUrl || "/placeholder.png"}
                alt="avatar"
            />

            <header className="comment__head">
                <div className="comment__author">
                    <span id={`c-${id}-title`} className="comment__name">{name}</span>
                    {status && <span className="comment__status">{status}</span>}
                </div>
                <time className="comment__time">
                    {time}&nbsp;&nbsp;{date}
                </time>
            </header>

            <p className="comment__text">{text}</p>
        </article>
    );
}


// Шаблончик:
// <Comment
//                     id=""
//                     name=""
//                     status=""
//                     imageUrl="/placeholder.png"
//                     time=""
//                     date=""
//                     text=""
//                 />
