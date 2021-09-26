async function getTodayPage() {
  let date = new Date();
  console.log(date);
  // let dateStr: string = date.toISOString().slice(0, 10)
  // const response = await notion.databases.query({
  //   database_id: "DAILY_DATABASE_ID",
  //   filter: {
  //     property: 'Date',
  //     date: {
  //       equals: dateStr,
  //     },
  //   },
  // });
  // const gasUrl = "https://script.google.com/macros/s/xxx/exec";

  // fetch(gasUrl)
  // .then(response => {
  //   return response.text();
  // })
  // .then(json => {
  //   console.log(`GASからのレスポンス: ${json}`);
  //   // callback(JSON.parse(json));
  // });
}

chrome.commands.onCommand.addListener((command: string) => {
  if (command == "today") {
    getTodayPage();
  }
});

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
