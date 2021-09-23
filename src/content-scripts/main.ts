import './index.css';

console.log("content.js開始");

chrome.runtime.sendMessage({
  message: "contentからbackgrouodに送るもの(無くてもいい)"
}, response => {
  console.log(`backgroundからの戻り値: ${JSON.stringify(response)}`);
});
