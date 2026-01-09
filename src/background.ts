// Background service worker for blocking URLs
// This runs independently of the popup and monitors all tabs

interface FocusModeState {
    isEnabled: boolean;
    blockedUrls: string[];
}

// Helper to check if URL matches any blocked patterns
function isUrlBlocked(url: string, blockedUrls: string[]): boolean {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        return blockedUrls.some(blockedUrl => {
            // Remove protocol if present in blocked URL
            const normalizedBlocked = blockedUrl.replace(/^https?:\/\//, '');

            // Check exact match or subdomain match
            return hostname === normalizedBlocked ||
                hostname.endsWith('.' + normalizedBlocked) ||
                normalizedBlocked === hostname.replace('www.', '');
        });
    } catch (e) {
        console.log('error: ', e);
        return false;
    }
}

// Listen for tab updates (navigation attempts)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    // Only check when URL changes (navigation attempt)
    if (changeInfo.url) {
        chrome.storage.local.get(['focusMode'], (result) => {
            const state = result.focusMode as FocusModeState | undefined;

            if (state && state.isEnabled && state.blockedUrls.length > 0 && changeInfo.url) {
                if (isUrlBlocked(changeInfo.url, state.blockedUrls)) {
                    // Block the navigation by redirecting to blocked page
                    chrome.tabs.update(tabId, {
                        url: chrome.runtime.getURL('blocked.html')
                    });
                }
            }
        });
    }
});

// Listen for web navigation before it commits
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    // Only process main frame navigation (not iframes)
    if (details.frameId === 0) {
        chrome.storage.local.get(['focusMode'], (result) => {
            const state = result.focusMode as FocusModeState | undefined;

            if (state && state.isEnabled && state.blockedUrls.length > 0) {
                if (isUrlBlocked(details.url, state.blockedUrls)) {
                    // Cancel navigation and redirect
                    chrome.tabs.update(details.tabId, {
                        url: chrome.runtime.getURL('blocked.html')
                    });
                }
            }
        });
    }
});

// Update extension icon based on focus mode state
function updateIcon(isEnabled: boolean) {
    // Swap between moon-on and moon-off icons
    const iconPrefix = isEnabled ? 'moon-on' : 'moon-off';
    chrome.action.setIcon({
        path: {
            16: `${iconPrefix}16.png`,
            48: `${iconPrefix}48.png`,
            128: `${iconPrefix}128.png`
        }
    });
}

// Listen for storage changes to update icon
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.focusMode) {
        const newState = changes.focusMode.newValue as FocusModeState | undefined;
        if (newState) {
            updateIcon(newState.isEnabled);
        }
    }
});

// Initialize icon state on extension load
chrome.storage.local.get(['focusMode'], (result) => {
    const state = result.focusMode as FocusModeState | undefined;
    updateIcon(state?.isEnabled ?? false);
});

console.log('Focus Mode background service worker loaded');