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


// ПРИКЛАД ВИКОРИСТАННЯ щоб швидко почати верстати нову сторінку

// import PageLayout from '../PageLayout.jsx';
// import Toc from '../../components/ToC/ToC.jsx'
// import Page_menu from "../../components/Page_menu/Page_menu.jsx";
//
// import '../shared.css'
//
// export default function YourNameHere() {
//     const tocItems = [
//         { id: "Title",  label: "WikiTravel" },
//     ];
//     return (
//         <PageLayout>
//             <section className={"shared-wrap"}>
//                 <aside className="shared__left">
//                     <Toc items={tocItems}/>
//                 </aside>
//                 <main className="shared__content">
//                     <h1 className={"shared-title"} id={"Title"}>WikiTravel</h1>
//                     <Page_menu className="long-line" />
//
//                 </main>
//             </section>
//         </PageLayout>
//     );
// }

