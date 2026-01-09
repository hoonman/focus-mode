export interface FocusModeState {
    isEnabled: boolean;
    blockedUrls: string[];
}

export interface PowerButtonProps {
    isEnabled: boolean;
    onToggle: () => void;
}