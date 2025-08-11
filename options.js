const API = typeof browser !== 'undefined' ? browser : chrome;
const form = document.getElementById('settings-form');
const status = document.getElementById('status');

// Load saved settings
chrome.storage.sync.get(['t4toolbar'], (data) => {
  const settings = data.t4toolbar || {};
  for (const input of form.elements) {
    if (input.type === 'checkbox' && input.name) {
      input.checked = settings[input.name] ?? true; // Default to true
    }
  }
});

// Save settings on submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const settings = {};
  for (const input of form.elements) {
    if (input.type === 'checkbox' && input.name) {
      settings[input.name] = input.checked;
    }
  }
  API.storage.sync.set({ t4toolbar: settings }, () => {
    status.textContent = 'Settings saved.';
    setTimeout(() => (status.textContent = ''), 2000);
  });
});
