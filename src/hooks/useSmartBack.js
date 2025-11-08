import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function parentPath(pathname) {
    const clean = pathname.replace(/\/+$/, "");
    const parts = clean.split("/");
    if (parts.length <= 2) return "/";
    return parts.slice(0, -1).join("/") || "/";
}

function samePathAndSearch(a, b) {
    const aPath = typeof a === "string" ? a : a?.pathname || "";
    const aSearch = typeof a === "string" ? "" : a?.search || "";
    return aPath === b?.pathname && aSearch === b?.search;
}

function isTechnicalRoute(loc) {
    const pathname = typeof loc === "string" ? loc : loc?.pathname || "";
    // /w/:action
    return /^\/w\/[^/]+(?:\/|$)/.test(pathname);
}

const STORAGE_KEY = "smartback:lastNonTechnical";

export default function useSmartBack({
                                         fallback = "/home",
                                         keepSearch = true,
                                         treatHashAsSamePage = true,
                                     } = {}) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isTechnicalRoute(location)) {
            const toStore = {
                pathname: location.pathname,
                search: keepSearch ? (location.search || "") : "",
            };
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
            } catch { /* empty */ }
        }
    }, [location.pathname, location.search, keepSearch, location]);

    return useCallback(() => {
        const from = location.state?.from;

        if (from && !isTechnicalRoute(from)) {
            if (!(treatHashAsSamePage && samePathAndSearch(from, location))) {
                navigate(from, { replace: true });
                return;
            }
        }

        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (
                    saved?.pathname &&
                    !(treatHashAsSamePage && samePathAndSearch(saved, location))
                ) {
                    navigate(
                        saved.pathname + (keepSearch ? (saved.search || "") : ""),
                        { replace: true }
                    );
                    return;
                }
            }
        } catch { /* empty */ }

        if (window.history.length > 1) {
            if (!(treatHashAsSamePage && location.hash)) {
                navigate(-1);
                return;
            }
        }

        const up =
            parentPath(location.pathname) + (keepSearch ? (location.search || "") : "");
        if (up !== location.pathname) {
            navigate(up, { replace: true });
            return;
        }

        navigate(fallback, { replace: true });
    }, [fallback, keepSearch, treatHashAsSamePage, location, navigate]);
}


/**
 * 1) якщо є location.state.from - піде туди
 * 2) якщо в історії є крок назад - navigate(-1)
 * 3) інакше на батьківський шлях
 * 4) якщо все погано - fallback ("/home")
 */
