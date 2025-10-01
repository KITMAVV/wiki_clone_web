import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
    const { pathname } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if (navType !== "POP") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [pathname, navType]);

    return null;
}
