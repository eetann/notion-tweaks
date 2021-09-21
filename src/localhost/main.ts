import {Client} from '@notionhq/client'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});
// const daily_database_id: string = process.env.DAILY_DATABASE_ID;
async function addItem(text) {
  console.log(text);
  const listUsersResponse = await notion.users.list()
  console.log(listUsersResponse)
}
addItem("hoge");
