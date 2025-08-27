import { useParams } from "react-router-dom";

import PageLayout from '../PageLayout.jsx';
import Toc from '../../components/Page_content_list/Page_content_list.jsx'
import Page_menu from "../../components/Page_menu/Page_menu.jsx";

import './UserProfile.css'


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
                    <Page_menu className="long-line" mainTab="Профіль користувача" showDiscussion={false} showHistory={false}/>
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

                    <section id="contributions" className="profile-user-contributions">

                    </section>
                </main>
            </section>
        </PageLayout>
    );
}
