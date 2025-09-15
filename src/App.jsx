import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tests from "./pages/dev/testing_page.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import HomePage from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import UserProfile from "./pages/Users/UserProfile.jsx";
import Navigation from "./pages/Navigation/Navigation.jsx";
import ContentPage from "./pages/Content/ContentPage.jsx";
import Discussion from "./pages/Discussion/Discussion.jsx";
import CreateArticle from "./pages/CreateArticle/CreateArticle.jsx";

import styles from "./test.module.css";



function Home() {
    return (
        <div className={styles.container}>
            <h1 style={{fontSize: 30}}>Кнопке кликат переходит по страница, пон?</h1>

            <Link to="/tests" className={styles.btn}>1) Tests</Link>
            <Link to="/login" className={styles.btn}>2) Login</Link>
            <Link to="/register" className={styles.btn}>3) Register</Link>
            <Link to="/home" className={styles.btn}>4) Home</Link>
            <Link to="/about" className={styles.btn}>5) About</Link>
            <Link to="/users/" className={styles.btn}>6) Profile(/users/vasya)</Link>
            <Link to="/navigation" className={styles.btn}>7) Navigation</Link>
            <Link to="/content" className={styles.btn}>8) Content</Link>
            <Link to="/discussion" className={styles.btn}>9) Discussion</Link>
            <Link to="/create-article" className={styles.btn}>10) Create Article</Link>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tests" element={<Tests/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/users/:username" element={<UserProfile />} />
                <Route path="/navigation" element={<Navigation/>}/>
                <Route path="/content" element={<ContentPage/>}/>
                <Route path="/discussion" element={<Discussion/>}/>
                <Route path="/create-article" element={<CreateArticle/>}/>
            </Routes>
        </Router>
    );
}
