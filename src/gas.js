const scriptProperties = PropertiesService.getScriptProperties();
const notionPrefix = "https://www.notion.so/";


function init() {
  // TODO: Set your API key and ID
  // TODO: Run this function
  scriptProperties.setProperties({
    "NOTION_API_KEY": "",
  });
}

function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());
  const command = params.name;
  let res;
  if (command == "query_database") {
    res = postNotion("databases/" + params.targetId + "/query", params.data);
  } else if (command == "update_database") {
    res = postNotion("databases/" + params.targetId, params.data);
  } else if (command == "create_page") {
    res = postNotion("pages", params.data);
  }

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(res);
  return output;
}

function postNotion(endpoint, payload) {
  const notionApiKey = scriptProperties.getProperty("NOTION_API_KEY");
  const api = "https://api.notion.com/v1/" + endpoint;
  const headers = {
    "Authorization": "Bearer " + notionApiKey,
    "Content-Type": "application/json",
    "Notion-Version": "2021-08-16"
  };

  const res = UrlFetchApp.fetch(api, {
    headers: headers,
    method: "POST",
    payload: JSON.stringify(payload),
  }
  );

  return res.getContentText();
}
