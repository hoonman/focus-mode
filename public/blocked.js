// Script for the blocked page

// Display the blocked URL
const params = new URLSearchParams(window.location.search);
const blockedUrl = document.referrer || 'Unknown URL';
document.getElementById('blockedUrl').textContent = blockedUrl;

// Go back button
document.getElementById('goBackBtn').addEventListener('click', () => {
  window.history.back();
});

// Open settings (popup)
document.getElementById('openSettingsBtn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage?.() || chrome.action.openPopup?.();
});

// Motivational quotes (optional enhancement)
const quotes = [
  "Stay focused on your goals. You've got this! 💪",
  "Success is the sum of small efforts repeated day in and day out. 🎯",
  "Your future self will thank you for staying focused today. 🌟",
  "Focus is the art of knowing what to ignore. 🧘",
  "Don't let distractions steal your dreams. Keep pushing! 🚀"
];

// Randomize motivational quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector('.motivational-text').textContent = `"${randomQuote}"`;