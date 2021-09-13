// WebSocket will close in 30 seconds after extension reload by Service Worker
const sock = new WebSocket("ws://localhost:8000");
// tell the server that the extension has been reloaded
sock.addEventListener("open", () => {
  sock.send('reloaded');
})
sock.addEventListener("message", e => {
  if (e.data == 'options') {
    chrome.runtime.openOptionsPage();
  }
})

// chrome.runtime will not close in 30 seconds after extension reload
// because when Service Worker is disabling, this script will be reloaded
chrome.runtime.onMessage.addListener((msg) => {
  if (msg == 'restart') {
    chrome.runtime.reload();
  }
  return true
});
