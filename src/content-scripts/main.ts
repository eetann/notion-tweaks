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

document.body.addEventListener("keyup", event => {
  if (event.key === "q" && event.ctrlKey) {
    writeTimeStamp();
  }
});

console.log("Notion Tweaks!");
