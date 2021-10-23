import {getStorage, setStorage} from "../lib/storage"
import {Client} from "@notionhq/client";

interface TodayData {
  date: string,
  url: string,
}

async function apiViaGAS(command: any) {
  const gasUrl: string = (await getStorage("gas-url") as string);
  if (gasUrl === "") {
    return {};
  }
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

async function apiViaSDK(command: any) {
  const notionAPI: string = (await getStorage("notion-api") as string);
  if (notionAPI === "") {
    return {};
  }
  const notion = new Client({
    auth: notionAPI
  });
  if (command.name == "query_database") {
    return await notion.databases.query({
      database_id: command.targetId, filter: command.data.filter,
    });
  } else if (command.name === "update_database") {
    return await notion.databases.update({
      database_id: command.targetId, title: command.data.title,
      properties: command.data.properties,
    });
  } else if (command.name === "create_page") {
    return await notion.pages.create({
      parent: command.data.parent,
      properties: command.data.properties,
      children: command.data.children,
    });
  }
}

async function runAPI(command: any) {
  const selectAPI: string = (await getStorage("select-api") as string);
  if (selectAPI === "gas-url") {
    return await apiViaGAS(command);
  }
  return await apiViaSDK(command);
}

async function createNewTodayPage(dateStr: string) {
  const notionDailyId: string = (await getStorage("notion-daily-id") as string);
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
              {type: "text", text: {content: "😼LOG"}}
            ]
          },
        },
      ]
    }
  };
  const resJson = await runAPI(command);
  if (!Object.keys(resJson).length) {
    return "";
  }
  const url: string = resJson.url;
  return url;
}

async function getTodayPageViaAPI(dateStr: string) {
  const notionDailyId: string = (await getStorage("notion-daily-id") as string);
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

  const resJson = await runAPI(command);
  if (!Object.keys(resJson).length) {
    return "";
  }
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
  const todayPageUrl = await getTodayPageViaAPI(dateStr);
  if (todayPageUrl === "") {
    return;
  }
  chrome.tabs.create({
    url: todayPageUrl,
  });
  return;
}

async function createNewZ10nPage(title: string) {
  const notionZ10nId: string = (await getStorage("notion-z10n-id") as string);
  const command = {
    name: "create_page",
    data: {
      parent: {database_id: notionZ10nId},
      properties: {
        Name: {title: [{text: {content: title}}], },
      },
    }
  };
  const resJson = await runAPI(command);
  const url: string = resJson.url;
  return url;
}


chrome.commands.onCommand.addListener((command: string) => {
  if (command === "today") {
    getTodayPage();
    console.log("Called Got Today Page");
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, callback) => {
  if (request.message === "z10n") {
    const url: string = await createNewZ10nPage(request.title);
    callback(url);
  }
  return true;
});
