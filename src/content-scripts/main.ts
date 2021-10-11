import './index.css';

function dispatchPaste(target: Element, text: string) {
  const dataTransfer = new DataTransfer();
  dataTransfer.setData('text/plain', text);
  target.dispatchEvent(
    new ClipboardEvent('paste', {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true
    })
  );
  dataTransfer.clearData();
}


function writeTimeStamp() {
  const focusElement = document.activeElement;
  if (focusElement.tagName === "body") {
    return;
  }
  const now = new Date();
  const nowStr = now.getHours().toString() + ":" + now.getMinutes().toString() + " ";
  dispatchPaste(focusElement, nowStr);
}

document.body.addEventListener("keyup", event => {
  if (event.key === "q" && event.ctrlKey) {
    writeTimeStamp();
  }
});

console.log("Notion Tweaks!");
