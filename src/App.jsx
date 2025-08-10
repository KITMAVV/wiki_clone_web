import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tests from "./pages/dev/testing_page.jsx";
import Login from "./pages/Auth/Login.jsx";

function Home() {
    return (
        <div>
            <h1 style={{fontSize: 30}}>Кнопке кликат переходит по страница, пон?</h1>
            <Link to="/tests">
                <button>1) Tests</button>
            </Link>
            <Link to="/Login">
                <button>2) Login</button>
            </Link>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
