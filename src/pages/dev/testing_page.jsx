import styles from './test.module.css'
import {Link} from "react-router-dom";
export default function Tests() {

    return (
        <div className={styles.container}>
            <h1 style={{fontSize: 30}}>Кнопке кликат переходит по страница, пон?</h1>

            <Link to="/dev" className={styles.btn}>1) Tests</Link>
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


//ToDo - якорьки треба попідключати в TOC(на кожній сторінці). Поки-що необов'язково
