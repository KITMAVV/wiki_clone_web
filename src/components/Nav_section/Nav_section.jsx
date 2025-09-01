import './Nav_section.css'

export function NavigationTextContainer({ children }) {
    return (
        <section className="navigation-text-container">
            {children}
        </section>
    );
}

export function NavSection({ title, children }) {
    return (
        <>
            <div className="nav-label">
                <h2 className="nav-title">{title}</h2>
            </div>
            <div className="nav-content">{children}</div>
        </>
    );
}
