const sock = new WebSocket("ws://localhost:8000");
sock.addEventListener("message", e => {
  if (e.data == 'reload') {
    // send "options" to ExtensionReloader to reopen options page
    sock.send('options');
  } else if (e.data == 'restart') {
    // send "options" to ExtensionReloader to reopen options page
    // send "restart" to service worker to reload extension
    sock.send('options');
    chrome.runtime.sendMessage('restart');
  }
})
sock.addEventListener("error", (e) => {
  console.log("WebSocket error: ", e);
})
