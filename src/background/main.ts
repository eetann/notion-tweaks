chrome.runtime.onMessage.addListener(
  (request, _, callback) => {
    console.log(`バックグラウンドで受け取ったもの: ${request.message}`);

    // 「ウェブアプリ」としてデプロイしてるGASのURL
    const gasUrl = "https://script.google.com/macros/s/xxx/exec";

    fetch(gasUrl)
    .then(response => {
      return response.text();
    })
    .then(json => {
      console.log(`GASからのレスポンス: ${json}`);
      // callback(JSON.parse(json));
    });

    // 非同期を同期的に扱うためのtrue
    return true;
  }
);
