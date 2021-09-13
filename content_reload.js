const sock = new WebSocket("ws://localhost:8000");
sock.addEventListener("message", e => {
  if (e.data == 'reload') {
    // reload tab after extension reloaded
    setTimeout(() => {window.location.reload()}, 2000)
  } else if (e.data == 'restart') {
    // reload tab after extension reloaded
    // send "restart" to service worker to reload extension
    setTimeout(() => {window.location.reload()}, 2000)
    chrome.runtime.sendMessage('restart');
  }
})
sock.addEventListener("error", (e) => {
  console.log("WebSocket error: ", e);
})
