import React, { useState } from "react";
import { Link } from "react-router-dom";

import './DropInstrumentsButton.css'
const DropInstrumentsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(v => !v);

    const qrLink = `/qr?text=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
    )}`;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsOpen(false);
        } catch { /* empty */ }
    };

    return (
        <div className="drop-instruments-wrap">
            <button
                className="drop-instruments-btn"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={toggle}
            >
                Інструменти
                <span className="pm-icon" aria-hidden="true">
          <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
                x="12"
                width="12"
                height="12"
                transform="rotate(90 12 0)"
                fill="url(#pattern0_195_2046)"
                fillOpacity="0.5"
            />
            <defs>
              <pattern id="pattern0_195_2046" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_195_2046" transform="scale(0.01)" />
              </pattern>
              <image
                  id="image0_195_2046"
                  width="100"
                  height="100"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAsFJREFUeAHtnUFrE1EYRa/VfyJUd4WWYn+zGxdFXNY/U+imrbiwFhfqg84iJcQ3986lICcQwiTv3oRzmDfZfInEDQIQgAAEIAABCAQEXgVZohsSOJH0RdKDpEdJl5Leb9hP1QoCQ8Z3Sb+f3e//SvqwooelGxEYZ8ZzGcvxN6RsRHmy5uhpm1oE7HtEyiTMrZb9OHCGLIKQshXtiZ5PE0KGGKRMwNxiyVtJ4wK+nA2HHpGyBfGJjlNJtyukXEx0siQkgJQQYCOOlAbVsBMpIcBGHCkNqmEnUkKAjThSGlTDTqSEABtxpDSohp1ICQE24khpUA07kRICbMSR0qAadiIlBNiII6VBNexESgiwEUdKg2rYiZQQYCOOlAbVsBMpIcBGHCkNqmEnUkKAjThSGlTDTqSEABtxpDSohp1ICQE24khpUA07kRICbMSR0qAadiIlBNiII6VBNexESgiwEUdKg2rYiZQQYCM+5uLH2NyhsbrltTGGd9z4EHTuElgj5eNulKMWgdnt66b1AejdJXAm6W5i67rejXHUIMCW1aBqdq6RwUXdhDwbm92mxrcsfsBglqq5DhkmuEYMGQ2qZicyTHCNGDIaVM1OZJjgGjFkNKiancgwwTViyGhQNTuRYYJrxJDRoGp2IsME14gho0HV7ESGCa4RQ0aDqtmJDBNcI4aMBlWzExkmuEYMGQ2qZicyTHCNGDIaVM1OZJjgGjFkNKiancgwwTViyGhQNTuRYYJrxJDRoGp2IsME14gho0HV7ESGCa4RQ0aDqtmJDBNcI4aMBlWzExkmuEbsHX+92sDqd36emHZljMznuyr5WtLjhBBm+lZh9Re/kfTrH0KQ4fO1kl8PCEGGhTQLnUt62CNlzIGPuXFuL0BgSLl62r5+Srrkl3ZewMKetxwX+aM9z/MUBCAAAQhAAAIQ+D8I/AHcmbLopLLq2QAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </span>
            </button>

            {isOpen && (
                <div role="listbox" className={`drop-instruments-menu${isOpen ? " active" : ""}`}>
                    <div className="drop-instruments-title">Інструменти</div>
                    <ul className="drop-instruments-list">
                        <li role="option">
                            <Link to="#" onClick={() => setIsOpen(false)}>
                                Інформація про сторінку
                            </Link>
                        </li>
                        <li role="option">
                            <button
                                type="button"
                                className="drop-instruments-action"
                                onClick={handleCopyUrl}
                            >
                                Отримати URL адресу
                            </button>
                        </li>
                        <li role="option">
                            <Link to={qrLink} onClick={() => setIsOpen(false)}>
                                Завантажити QR-код
                            </Link>
                            {/*ToDo Qr код генератор*/}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropInstrumentsButton;
