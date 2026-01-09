import { useState, useEffect } from "react";
import type { FocusModeState } from "../types";

// check if we're in a Chrome extension context
const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

export const useFocusMode = () => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isChromeExtension) {
            // get it in extensioN? 
            chrome.storage.local.get(['focusMode'], (result) => {
                const data = result.focusMode as FocusModeState | undefined;
                if (data) {
                    setIsEnabled(data.isEnabled);
                    setBlockedUrls(data.blockedUrls || []);
                }
                setIsLoading(false);
            });
        } else {
            // use localStorage for development
            const stored = localStorage.getItem('focusMode');
            if (stored) {
                const data = JSON.parse(stored) as FocusModeState;
                setIsEnabled(data.isEnabled);
                setBlockedUrls(data.blockedUrls || []);
            }
            setIsLoading(false);
        }
    }, []);

    // save state whenever it changes
    useEffect(() => {
        if (!isLoading) {
            const state: FocusModeState = {
                isEnabled,
                blockedUrls,
            };

            if (isChromeExtension) {
                chrome.storage.local.set({ focusMode: state });
            } else {
                localStorage.setItem('focusMode', JSON.stringify(state));
            }
        }
    }, [isEnabled, blockedUrls, isLoading]);

    const toggleFocusMode = () => {
        setIsEnabled((prev) => !prev);
    };

    const addBlockedUrl = (url: string) => {
        if (!blockedUrls.includes(url)) {
            setBlockedUrls((prev) => [...prev, url]);
        }
    };

    const removeBlockedUrl = (url: string) => {
        setBlockedUrls((prev) => prev.filter((u) => u !== url));
    };

    return {
        isEnabled,
        blockedUrls,
        isLoading,
        toggleFocusMode,
        addBlockedUrl,
        removeBlockedUrl,
    };
};

