import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Tests from "../pages/dev/testing_page.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import HomePage from "../pages/Home/Home.jsx";
import About from "../pages/About/About.jsx";
import UserProfile from "../pages/Users/UserProfile.jsx";
import Navigation from "../pages/Navigation/Navigation.jsx";
import ContentPage from "../pages/Content/ContentPage.jsx";
import Discussion from "../pages/Discussion/Discussion.jsx";
import CreateArticle from "../pages/CreateArticle/CreateArticle.jsx";
import AuthStatus from "../pages/dev/test_playground.jsx";
import ScrollManager from "./ScrollManager.jsx";
import PreviewCreatedArticle from "../pages/CreateArticle/ArticlePreview.jsx";
import ArticleView from "../pages/ArticleView/ArticleView.jsx";
import ViewSource from "../pages/ViewSource/ViewSource.jsx";
function NotFound() {
    return (
        <div style={{padding: 24}}>
            <h1>404 — Нот Фаунд</h1>
            <p>Перевір URL або повернись на <a href="/home">головну</a>.</p>
        </div>
    ); //Todo додати окрему сторінку для помилок і тп
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollManager />
            <Routes>

                <Route path="/" element={<Navigate to="/home" replace />} />


                <Route path="/home" element={<HomePage/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />

                <Route path="/test" element={<Tests/>} />
                <Route path="/dev" element={<AuthStatus/>} />

                <Route path="/users/:username" element={<UserProfile />} />
                <Route path="/navigation" element={<Navigation/>} />
                <Route path="/content" element={<ContentPage/>} />
                <Route path="/discussion" element={<Discussion/>} />
                <Route path="/w/:action/:slug" element={<ViewSource/>} />

                <Route path="/create-article" element={<CreateArticle/>} />
                <Route path="/create-article/preview" element={<PreviewCreatedArticle/>} />
                <Route path="/wiki/:slug" element={<ArticleView/>} />

                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
