import { useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Tests() {
    const [count, setCount] = useState(0);

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />

            <main style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f9f9f9'}}>
                <button onClick={() => setCount(c => c + 1)}>
                    скажу честно: елементи сайту такі крихітні що я ледь не осліп поки з ними грався. {count}
                </button>
            </main>

            <Footer />
        </div>
    );
}

export default Tests;
