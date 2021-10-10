import './index.css';

document.body.addEventListener("keyup", event => {
  if (event.key === "q" && event.ctrlKey) {
    const now = new Date();
    const nowStr = now.getHours().toString() + ":" + now.getMinutes().toString() + " ";
    navigator.clipboard.writeText(nowStr);
    // navigator.clipboard.readText()
    // .then(function(text){
    //   pasteArea.textContent = text;
    // });
    console.log("ctrl + q");
  }
});

console.log("Notion Tweaks!");
