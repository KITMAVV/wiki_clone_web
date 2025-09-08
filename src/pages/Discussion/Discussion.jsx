import PageLayout from "../PageLayout.jsx";
import Toc from '../../components/Page_content_list/Page_content_list.jsx'
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import Comment from "./Comment.jsx";

import './Discussion.css'

export default function Discussion() {
    const tocItems = [
        { id: "discus",  label: "Обговорення" },
    ];

    const fakeData = {
        title: "Готелі обговорення",

        comments: [
            {
                id: "1",
                parentId: null,
                author: { id: "u1", name: "Alice" },
                content: "Класна стаття!",
                createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
                score: 5,
            },
            {
                id: "2",
                parentId: "1",
                author: { id: "u2", name: "Bob" },
                content: "Згоден 👍",
                createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                score: 2,
            },
        ],
    };

    return (
        <PageLayout>
            <section className={"discussion-wrap"}>
                <aside className="discussion__left">
                    <Toc items={tocItems}/>
                </aside>

                <main className="discussion__content">

                    <h1 className={"discussion-title"}>{fakeData.title}</h1>
                    <Page_menu className="long-line" mainTab="Стаття"/>

                    <div className={"discussion_comments_container"}>
                        <Comment
                            id="1"
                            name="Арбен"
                            status="місцевий житель"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="У The Plaza Tirana я відчув себе наче в сучасному європейському мегаполісі. Стильні інтер’єри, панорамні вікна на все місто, спа-центр і фітнес-зал. Дуже зручно для тих, хто приїхав у столицю у справах – поруч адміністративні будівлі, ресторани і музеї."
                        />
                        <Comment
                            id="2"
                            name="Марек"
                            status="історик"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="Готель Bougainville Bay у Саранді – мій фаворит на півдні Албанії. Він прямо на березі, з приватним пляжем і декількома басейнами, в тому числі на даху з неймовірним видом на Іонічне море. Номери світлі, простори, з балконами. Атмосфера розслаблена, ідеальна для відпочинку."
                        />
                        <Comment
                            id="3"
                            name="Лука"
                            status="турист"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="Подорожували з дружиною та друзями, і готелі Албанії приємно здивували. У Тирані зупинялися в сучасному бізнес-готелі — просторий номер, швидкий інтернет і смачний сніданок. На узбережжі, у Вльорі, обрали бутик-готель із видом на море — вранці прокидаєшся під шум хвиль. Ціни помірні, сервіс ввічливий."
                        />
                        <Comment
                            id="4"
                            name="Іванна"
                            status="тревел-блогерка"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="У Hotel Mangalemi у Бераті я провела дві ночі під час подорожі Албанією. Це сімейний готель, розташований у старовинному районі, майже поруч з фортецею. Власники дуже привітні, розповіли історії міста, порадили, де найкраще фотографувати захід сонця."
                        />
                        <Comment
                            id="5"
                            name="Емма"
                            status="фотографиня"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="Зупинялась у Hotel Tradita у Шкодері – це колоритний готель у відреставрованому історичному будинку. Всередині – дерев’яні стелі, старовинні килими, багато декору в традиційному стилі. Відчувається атмосфера старого міста. Сніданок готують зі свіжих місцевих продуктів."
                        />
                        <Comment
                            id="6"
                            name="Сабріна"
                            status="тревел-новачок"
                            imageUrl="/placeholder.png"
                            time="11:23"
                            date="20.03.2025"
                            text="Ми з чоловіком зупинялись у Hotel Adriatik у Дурресі – це справжній курортний комплекс на узбережжі. Чистий пляж, доглянута територія з басейном, номери з видом на море. Сніданки шведський стіл, багато свіжих фруктів і морепродуктів. Персонал привітний, допомогли організувати екскурсію в Тирану."
                        />
                    </div>



                    <form className="discussion-form">
                        <div className="discussion-form__field">
                            <input
                                type="text"
                                name="role"
                                placeholder="Ваша роль"
                                className="discussion-form__input"
                            />
                        </div>

                        <div className="discussion-form__toolbar">
                            <button type="button" className="discussion-form__btn discussion-form__btn--bold">Ж</button>
                            <button type="button" className="discussion-form__btn discussion-form__btn--italic">К</button>
                            <button type="button" className="discussion-form__btn discussion-form__btn--underline">А</button>
                        </div>

                        <div className="discussion-form__field">
                            <textarea
                                name="feedback"
                                placeholder="Враження"
                                rows="5"
                                className="discussion-form__textarea"
                            />
                        </div>
                        <p className="discussion-form__note">
                            Натискаючи “Додати відгук”, ви погоджуєтесь з нашими{" "}
                            <a href="#" className="discussion-form__link">Умовами використання</a>, а також погоджуєтесь
                            на
                            безповоротну публікацію вашого тексту згідно ліцензії CC BY-SA 4.0 і GFDL
                        </p>

                        <div className="discussion-form__actions">
                            <button type="submit" className="discussion-form__submit">
                                Додати відгук
                            </button>
                        </div>
                    </form>
                </main>
            </section>
        </PageLayout>
    );
}
