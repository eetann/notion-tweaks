import './index.css';
import dayjs from 'dayjs';
import {getStorage} from "../lib/storage"


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

function closeEmojiNoResults(event: KeyboardEvent) {
  // not strict
  // TODO: if "No results" is displayed, call this function
  if ((event.target as HTMLElement).textContent.match(/(\/|:|；).{2,}/)) {
    (event.target as HTMLElement).click();
  }
}

function callCreateNewZ10nPage(event: KeyboardEvent) {
  const selectText: string = document.getSelection().toString();
  chrome.runtime.sendMessage({message: "z10n", title: selectText}, (response) => {
    if (selectText !== "") {
      // cut select text
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', selectText);
      (event.target as HTMLElement).dispatchEvent(
        new ClipboardEvent('cut', {
          clipboardData: dataTransfer,
          bubbles: true,
          cancelable: true
        })
      );
    }
    // paste url
    const url: string = response;
    writeUrl(url);
  });
}

let prefixPressed: boolean = false;
document.body.addEventListener("keydown", async (event) => {
  if (event.repeat) {
    return;
  }
  if (event.ctrlKey && event.key === "q") {
    event.preventDefault();
    prefixPressed = true;
    setTimeout(() => prefixPressed = false, 1500);
  } else if (prefixPressed && event.key === "t") {
    event.preventDefault();
    prefixPressed = false;
    const onTimeStamp: boolean = (await getStorage("onTimeStamp") as boolean) || false;
    if (!onTimeStamp) {
      return;
    }
    writeTimeStamp();
  } else if (prefixPressed && event.key === "c") {
    event.preventDefault();
    prefixPressed = false;
    const onCloseMenu: boolean = (await getStorage("onCloseMenu") as boolean) || false;
    if (!onCloseMenu) {
      return;
    }
    closeEmojiNoResults(event);
  } else if (prefixPressed && event.key === "z") {
    event.preventDefault();
    prefixPressed = false;
    const onCreateZ10n: boolean = (await getStorage("onCreateZ10n") as boolean) || false;
    if (!onCreateZ10n) {
      return;
    }
    callCreateNewZ10nPage(event);
  }
});

function applyCSS(name: string) {
  (async () => {
    const onFeature: boolean = (await getStorage(name) as boolean) || false;
    if (!onFeature) {
      return;
    }
    document.getElementById("notion-app").classList.toggle(name);
  })();
}

applyCSS("narrow-page-width");
applyCSS("narrow-code-block-bottom");
applyCSS("show-code-block-language");

console.log("Notion Tweaks!");
