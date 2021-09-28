const scriptProperties = PropertiesService.getScriptProperties();
const notionPrefix = "https://www.notion.so/";


function init() {
  // TODO: Set your API key and ID
  // TODO: Run this function
  scriptProperties.setProperties({
    "NOTINO_API_KEY": "",
  });
}

function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());
  const command = params.name;
  let res = {};
  if (command == "databases_query") {
    res = postNotion("databases/" + params.database_id + "/query", params.data);
  }

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(res));
  return output;
}

function postNotion(endpoint, payload) {
  const notionApiKey = scriptProperties.getProperty("NOTINO_API_KEY");
  const api = "https://api.notion.com/v1/" + endpoint;
  const headers = {
    "Authorization": "Bearer " + notionApiKey,
    "Content-Type": "application/json",
    "Notion-Version": "2021-05-13"
  };

  const res = UrlFetchApp.fetch(api, {
    headers: headers,
    method: "POST",
    payload: JSON.stringify(payload),
  }
  );

  const json = JSON.parse(res.getContentText());
  return json;
}
