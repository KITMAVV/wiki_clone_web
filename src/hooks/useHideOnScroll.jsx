import { useEffect, useState, useRef } from "react";

export function useHideOnScroll(deadZone = 10, topThreshold = 30) {
    const [hidden, setHidden] = useState(false);
    const lastYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            const currentY = window.scrollY;
            const lastY = lastYRef.current;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (currentY - lastY > deadZone) {
                        setHidden(true);
                    } else if (lastY - currentY > deadZone || currentY < topThreshold) {
                        setHidden(false);
                    }
                    lastYRef.current = currentY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [deadZone, topThreshold]);

    return hidden;
}
