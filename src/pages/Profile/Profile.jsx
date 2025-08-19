import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Profile() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />

            <main style={{flex: 1, display: 'flex', justifyContent: 'center', background: '#f9f9f9', paddingTop: '90px'}}></main>

            <Footer />
        </div>
    );
}

export default Profile;
