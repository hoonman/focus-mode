import React from "react";
import type { PowerButtonProps } from "../types";
import './PowerButton.css';

export const PowerButton: React.FC<PowerButtonProps> = ({ isEnabled, onToggle }) => {
    return (
        <button
            className={`power-button ${isEnabled ? 'enabled' : 'disabled'}`}
            onClick={onToggle}
            aria-label={isEnabled ? 'Disable focus mode' : 'Enable focus mode'}
        >
            <svg
                className="power-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2v10" />
                <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
            </svg>
        </button>
    )

}