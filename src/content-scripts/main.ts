import './index.css';
import dayjs from 'dayjs';

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
  const nowStr = dayjs().format("HH:mm");
  dispatchPaste(focusElement, nowStr);
}

let prefixPressed: boolean = false;
document.body.addEventListener("keydown", event => {
  if (event.repeat) {
    return;
  }
  if (event.ctrlKey && event.key === "q") {
    prefixPressed = true;
    setTimeout(() => prefixPressed = false, 1500);
    event.preventDefault();
  } else if (prefixPressed && event.key === "t") {
    prefixPressed = false;
    writeTimeStamp();
    event.preventDefault();
  }
});

console.log("Notion Tweaks!");
