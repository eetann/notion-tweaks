const scriptProperties = PropertiesService.getScriptProperties();
const notionPrefix = "https://www.notion.so/";


function init() {
  // TODO: Set your API key and ID
  // TODO: Run this function
  scriptProperties.setProperties({
    "NOTINO_API_KEY": "",
    "NOTIN_DAILY_ID": "",
    "NTION_Z10N_ID": "",
  });
}

function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());

  const res = {sucsess: true, body: JSON.stringify(params)};

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(res));
  return output;
}

function fetchNotion() {
  let payload = {
    filter: {
      and: [
        {property: "hoge"},
      ]
    }
  };
  let json = postNotion("/databases/" + notionDbId + "/query", payload);
  return json;
}

function postNotion(endpoint, payload) {
  const notionApiKey = scriptProperties.getProperty("NOTINO_API_KEY");
  let api = "https://api.notion.com/v1" + endpoint;
  let headers = {
    "Authorization": "Bearer " + notionApiKey,
    "Content-Type": "application/json",
    "Notion-Version": "2021-05-13"
  };

  let res = UrlFetchApp.fetch(
    api,
    {
      headers: headers,
      method: "POST",
      payload: JSON.stringify(payload),
    }
  );

  let json = JSON.parse(res.getContentText());
  return json;
}
