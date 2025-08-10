import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function AuthLayout({ children }) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />

            <main style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f9f9f9'}}>
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default AuthLayout;
