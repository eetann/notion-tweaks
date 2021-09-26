async function getTodayPage() {
  let date = new Date();
  let dateStr: string = date.toISOString().slice(0, 10)
  const notion_data = {
    command: "getTodayPage",
    database_id: "DAILY_DATABASE_ID",
    filter: {
      property: 'Date',
      date: {
        equals: dateStr,
      },
    },
  };
  const gasUrl = "https://script.google.com/macros/hoge/dev";
  const res: Response = await fetch(gasUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ notion_data }),
  });
  if (!res.ok) {
    console.log("error" + res.status);
  }
  console.log(res.text());
}

chrome.commands.onCommand.addListener((command: string) => {
  if (command == "today") {
    getTodayPage();
  }
});
