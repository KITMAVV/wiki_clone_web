import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tests from "./pages/dev/testing_page.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import styles from "./test.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <h1 style={{fontSize: 30}}>Кнопке кликат переходит по страница, пон?</h1>

            <Link to="/tests" className={styles.btn}>1) Tests</Link>
            <Link to="/login" className={styles.btn}>2) Login</Link>
            <Link to="/register" className={styles.btn}>3) Register</Link>
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
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    );
}
