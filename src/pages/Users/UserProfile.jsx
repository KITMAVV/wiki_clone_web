import { useParams } from "react-router-dom";

import PageLayout from '../PageLayout.jsx';
import Toc from '../../components/Page_content_list/Page_content_list.jsx'
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import DataTable from "../../components/Table_master/Table_master.jsx";
import FavoritesCard from "./FavoritesCards.jsx";



import './UserProfile.css'


// тут даные таблицы правок
const columns = [
    { key: "id",    title: "№",    style: { width: 90 } },
    { key: "date",  title: "Дата та час зміни" },
    { key: "page",  title: "Сторінка" },
    { key: "description",  title: "Опис внеску", style: { width: 400 } },
    { key: "status",  title: "Статус зміни" },
];
const rows = [
    { id: 1, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 2, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 3, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 4, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 5, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 6, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 7, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 8, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 9, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
    { id: 10, date: "2025-08-10 20:31", page: "Албанія / Туризм", description: "Додано інформацію про пляж «пупупу» з описом", status: "Опубліковано" },
];

const favorites = [
    {
        imageUrl:
            "/placeholder.png",
        title: "Парки, бари та арт-квартали Албанії",
        category: "Подорожі / Дозвілля",
        date: "15.03.2025",
        description:
            "Огляд найкращих локацій для прогулянок, відпочинку та культурних подій в Албанії.",
    },
    {
        imageUrl:
            "/placeholder.png",
        title: "Гастротур Італією",
        category: "Їжа / Подорожі",
        date: "21.03.2025",
        description:
            "Дегустації у виноробнях, кулінарні майстер-класи та традиційні ринки.",
    },
    {
        imageUrl:
            "/placeholder.png",
        title: "Музейні квартали Відня",
        category: "Культура / Подорожі",
        date: "10.04.2025",
        description:
            "Гід по музеям сучасного мистецтва та атмосферним кав’ярням поряд.",
    },
];

export default function UserProfile() {
    const tocItems = [
        { id: "user_info",  label: "Інформація користувача" },
        { id: "contributions",  label: "Внески" },
        { id: "favorites",  label: "Обране" },
    ];


    const { username } = useParams();

    const fakeUsers = {
        vasya: {
            displayName: "brrpatapim228",
            bio: "Крутий подорожувач(ні)",
            joined: "2024-05-12",
            edits: 52,
            name: "Віталій",
            role: "Тревел-новачок",
            birthday: "1988-12-25",
            email: "patapim@gmail.com",
            gender: "male",
            autoLogout: "1h",
            photoUrl: "/placeholder.png",
        },
        petya: {
            displayName: "Патускі",
            bio: "Я не знаю що тут написати",
            joined: "2023-09-01",
            edits: 17,
            name: "Петро",
            role: "Досвідчений мандрівник",
            birthday: "1995-03-10",
            email: "petro@gmail.com",
            gender: "male",
            autoLogout: "4h",
            photoUrl: "/placeholder.png",
        },
    };

    const user = fakeUsers[username] || {
        displayName: username,
        bio: "test profile",
        joined: "—",
        edits: 0,
        name: "",
        role: "Користувач",
        birthday: "",
        email: "",
        gender: "other",
        autoLogout: "1h",
        photoUrl: "/placeholder.png",
    };

    return (
        <PageLayout>
            <section className={"profile-wrap"}>
                <aside className="profile__left">
                    <Toc items={tocItems}/>
                </aside>
                <main className="profile__content">
                    <h1 className="profile-title">Користувач: {user.displayName}</h1>
                    <Page_menu className="long-line" mainTab="Профіль користувача" showDiscussion={false}
                               showHistory={false}/>
                    <section id="user_info" className="profile-user-info">
                        <h1>Інформація користувача</h1>

                        <div className="profile-grid">
                            <div className="profile-col">
                                <label className="profile-label" htmlFor="profile-name">Ім’я</label>
                                <input
                                    id="profile-name"
                                    className="profile-input"
                                    type="text"
                                    defaultValue={user.name}
                                />

                                <label className="profile-label" htmlFor="profile-bday">Дата народження</label>
                                <input
                                    id="profile-bday"
                                    className="profile-input"
                                    type="date"
                                    defaultValue={user.birthday}
                                />

                                <label className="profile-label" htmlFor="profile-gender">Стать</label>
                                <select
                                    id="profile-gender"
                                    className="profile-input"
                                    defaultValue={user.gender}
                                >
                                    <option value="male">Чоловіча</option>
                                    <option value="female">Жіноча</option>
                                    <option value="other">Інша</option>
                                </select>
                            </div>

                            <div className="profile-col">
                                <span className="profile-label">Роль</span>
                                <div className="profile-readonly">{user.role}</div>

                                <label className="profile-label" htmlFor="profile-email">Пошта</label>
                                <input
                                    id="profile-email"
                                    className="profile-input"
                                    type="email"
                                    defaultValue={user.email}
                                />

                                <label className="profile-label" htmlFor="profile-logout">Автоматичний вихід</label>
                                <select
                                    id="profile-logout"
                                    className="profile-input"
                                    defaultValue={user.autoLogout}
                                >
                                    <option value="15m">15 хв бездіяльності</option>
                                    <option value="1h">1 година бездіяльності</option>
                                    <option value="4h">4 години бездіяльності</option>
                                </select>
                            </div>

                            <aside className="profile-avatar">
                                <img
                                    className="profile-avatar-img"
                                    src={user.photoUrl}
                                    alt="Фото користувача"
                                />
                                <button className="profile-btn" type="button">Редагувати фото</button>
                            </aside>
                        </div>
                    </section>

                    <section id="contributions" className="profile-user-section">
                        <h1 className={"profile-section-title"}>Внески</h1>
                        <div>
                            <DataTable columns={columns} rows={rows}/>
                        </div>
                    </section>

                    <section id="favorites" className="profile-user-section">
                        <h1 className={"profile-section-title"}>Обране</h1>
                        <div className={"profile-user-favorites"}>
                            {favorites.map((item, i) => (
                                <FavoritesCard
                                    key={i}
                                    imageUrl={item.imageUrl}
                                    title={item.title}
                                    category={item.category}
                                    date={item.date}
                                    description={item.description}
                                    onOpen={() => console.log("open", item.title)}
                                    onDelete={() => console.log("delete", item.title)}
                                />
                            ))}
                        </div>
                    </section>
                    <div className={"profile-explanation"}>
                    <p>Сторінка профілю користувача містить основну інформацію про учасника спільноти, його внески та
                        обрані матеріали.</p>
                    <p>У розділі “Обране” зберігаються статті та сторінки, які користувач позначив для швидкого доступу.</p>
                    <p>У розділі “Внески” відображається історія створених і відредагованих матеріалів.</p>
                    <p>Блок “Інформація про користувача” містить особисті відомості, які учасник бажає оприлюднити, а також теми, в яких він спеціалізується або цікавиться.</p>
                    </div>
                </main>
            </section>
        </PageLayout>
    );
}
