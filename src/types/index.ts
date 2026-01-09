export interface FocusModeState {
  isEnabled: boolean;
  blockedUrls: string[];
}

export interface PowerButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export interface BlockedUrlListProps {
  urls: string[];
  onRemove: (url: string) => void;
}

export interface AddUrlFormProps {
  onAdd: (url: string) => void;
}