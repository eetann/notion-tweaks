import {getStorage, setStorage} from "../lib/storage"

interface TodayData {
  date: string,
  url: string,
}

async function apiViaGAS(command: any) {
  const gasUrl: string = (await getStorage("gasUrl") as string);
  const res: Response = await fetch(gasUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    console.log("error" + res.status);
  }
  return await res.json();
}

async function createNewTodayPage(dateStr: string) {
  const notionDailyId: string = (await getStorage("notionDailyId") as string);
  const command = {
    name: "create_page",
    data: {
      parent: {database_id: notionDailyId},
      properties: {
        Name: {title: [{text: {content: dateStr}}], },
        Date: {
          date: {
            start: dateStr,
          }
        },
      },
      children: [
        {
          object: "block",
          type: "heading_1",
          heading_1: {
            text: [
              {type: "text", text: {content: "🐣TODO"}}
            ]
          },
        },
        {
          object: "block",
          type: "heading_1",
          heading_1: {
            text: [
              {type: "text", text: {content: "😼LOG"}}
            ]
          },
        },
      ]
    }
  };
  const resJson = await apiViaGAS(command);
  const url: string = resJson.url;
  return url;
}

async function getTodayPageViaGAS(dateStr: string) {
  const notionDailyId: string = (await getStorage("notionDailyId") as string);
  const command = {
    name: "query_database",
    targetId: notionDailyId,
    data: {
      filter: {
        property: "Date",
        date: {
          equals: dateStr,
        },
      },
    }
  };
  let todayPageUrl: string = "";

  const resJson = await apiViaGAS(command);
  console.log(resJson);
  const api_result: Array<any> = resJson.results;
  if (api_result.length !== 1) {
    if (api_result.length === 0) {
      todayPageUrl = await createNewTodayPage(dateStr);
    } else {
      console.log("2つ以上あります");
      return "";
    }
  } else {
    todayPageUrl = api_result[0].url;
  }
  const todayData: TodayData = {date: dateStr, url: todayPageUrl};

  await setStorage("today", todayData);
  return todayPageUrl;
}

async function getTodayPage() {
  const date = new Date();
  const dateStr: string = date.toISOString().slice(0, 10);
  const todayData = await getStorage("today");
  if (todayData !== null) {
    if ((todayData["url"] !== "") && (todayData["date"] === dateStr)) {
      chrome.tabs.create({
        url: todayData["url"],
      });
      return;
    }
  }
  const todayPageUrl = await getTodayPageViaGAS(dateStr);
  if (todayPageUrl === "") {
    return;
  }
  chrome.tabs.create({
    url: todayPageUrl,
  });
  return;
}

chrome.commands.onCommand.addListener((command: string) => {
  if (command === "today") {
    getTodayPage();
    console.log("Called Got Today Page");
  }
});
