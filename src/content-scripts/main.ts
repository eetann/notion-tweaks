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

function writeUrl(url: string) {
  const focusElement = document.activeElement;
  if (focusElement.tagName === "body") {
    return;
  }
  dispatchPaste(focusElement, url);
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
  } else if (prefixPressed && event.key === "c") {
    prefixPressed = false;
    closeEmojiNoResults(event);
    event.preventDefault();
  } else if (prefixPressed && event.key === "z") {
    prefixPressed = false;
    callCreateNewZ10nPage(event);
    event.preventDefault();
  }
});

function closeEmojiNoResults(event: KeyboardEvent) {
  // not strict
  // TODO: if "No results" is displayed, call this function
  if ((event.target as HTMLElement).textContent.match(/(\/|:|；).{2,}/)) {
    (event.target as HTMLElement).click();
  }
}

function callCreateNewZ10nPage(event: KeyboardEvent) {
  const selection: Selection = document.getSelection();
  chrome.runtime.sendMessage({message: "z10n", title: selection.toString()}, (response) => {
    const url: string = response;
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', selection.toString());
    (event.target as HTMLElement).dispatchEvent(
      new ClipboardEvent('cut', {
        clipboardData: dataTransfer,
        bubbles: true,
        cancelable: true
      })
    );
    writeUrl(url);
  });
}

console.log("Notion Tweaks!");
