interface TodayData {
  date: string,
  url: string,
}

async function getTodayPageViaGAS(dateStr: string) {
  const command = {
    name: "databases_query",
    database_id: "",
    data: {
      filter: {
        property: 'Date',
        date: {
          equals: dateStr,
        },
      },
    }
  };
  const gasUrl = "";

  const res: Response = await fetch(gasUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    console.log("error" + res.status);
  }
  const resJson = await res.json();
  const api_result: Array<any> = resJson.results;
  if (api_result.length != 1) {
    console.log("ページが作成されていないか，2つ以上あります");
    return;
  }
  const todayPageUrl: string = api_result[0].url;
  const todayData: TodayData = {date: dateStr, url: todayPageUrl};

  chrome.storage.local.set({
    today: JSON.stringify(todayData),
  });
  return todayPageUrl;
}

async function getTodayPage() {
  const date = new Date();
  // const month: Number = date.getMonth() + 1;
  // const day: Number = date.getDay();
  const dateStr: string = date.toISOString().slice(0, 10)
  let todayPageUrl: string = "";
  chrome.storage.local.get("today", (result) => {
    if (typeof result.today !== "undefined") {
      const todayData: TodayData = JSON.parse(result.today);
      if (todayData.date == dateStr) {
        todayPageUrl = todayData.url;
      }
    }
  });
  if (todayPageUrl == "") {
    todayPageUrl = await getTodayPageViaGAS(dateStr);
  }

  chrome.tabs.create({
    url: todayPageUrl,
  });
}

chrome.commands.onCommand.addListener((command: string) => {
  if (command == "today") {
    getTodayPage();
    console.log("Called Got Today Page");
  }
});
