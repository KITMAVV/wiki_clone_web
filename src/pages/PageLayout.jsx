import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

function PageLayout({ children, lastEdited }) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />

            <main style={{flex: 1, display: 'flex', paddingLeft: '190px', background: '#f9f9f9', paddingTop: '90px'}}>
                {children}
            </main>

            <Footer lastEdited={lastEdited} />
        </div>
    );
}

export default PageLayout;
